import React from 'react';

/**
 * Lightweight Markdown parser and renderer for LMS content.
 * Supports light & dark themes, headers, blockquotes, code blocks, tables, lists, and formatting.
 */
export default function MarkdownRenderer({ content = '', className = '', theme = 'light' }) {
  const isLight = theme === 'light';

  if (!content) {
    return (
      <div style={{ color: isLight ? '#94a3b8' : '#64748b', fontStyle: 'italic', padding: '1rem' }}>
        No content provided for this topic yet. Click "Edit Topic" to write content.
      </div>
    );
  }

  // Parse markdown lines into structured blocks
  const parseMarkdown = (rawText) => {
    const lines = rawText.replace(/\r\n/g, '\n').split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer = [];
    let tableBuffer = [];
    let listBuffer = [];
    let listType = null; // 'ul' | 'ol'

    const flushCode = () => {
      if (inCodeBlock) {
        elements.push({
          type: 'code_block',
          language: codeLanguage,
          content: codeBuffer.join('\n')
        });
        inCodeBlock = false;
        codeLanguage = '';
        codeBuffer = [];
      }
    };

    const flushTable = () => {
      if (tableBuffer.length > 0) {
        elements.push({
          type: 'table',
          rows: [...tableBuffer]
        });
        tableBuffer = [];
      }
    };

    const flushList = () => {
      if (listBuffer.length > 0) {
        elements.push({
          type: listType,
          items: [...listBuffer]
        });
        listBuffer = [];
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          flushCode();
        } else {
          flushTable();
          flushList();
          inCodeBlock = true;
          codeLanguage = line.trim().replace(/^```/, '').trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Tables (must contain |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        flushList();
        // Skip table separator line (e.g. |---|---|)
        if (/^\|(\s*[-:]+[-|\s:]*)\|$/.test(line.trim())) {
          continue;
        }
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        tableBuffer.push(cells);
        continue;
      } else {
        flushTable();
      }

      // Unordered lists
      const ulMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
      if (ulMatch) {
        if (listType === 'ol') flushList();
        listType = 'ul';
        listBuffer.push(ulMatch[2]);
        continue;
      }

      // Ordered lists
      const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
      if (olMatch) {
        if (listType === 'ul') flushList();
        listType = 'ol';
        listBuffer.push(olMatch[2]);
        continue;
      }

      flushList();

      // Horizontal rule
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
        elements.push({ type: 'hr' });
        continue;
      }

      // Headers
      const hMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (hMatch) {
        elements.push({
          type: `h${hMatch[1].length}`,
          text: hMatch[2]
        });
        continue;
      }

      // Blockquote / Callouts
      if (line.trim().startsWith('>')) {
        const quoteText = line.trim().replace(/^>\s*/, '');
        elements.push({
          type: 'quote',
          text: quoteText
        });
        continue;
      }

      // Standalone Image: ![alt](url)
      const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        elements.push({
          type: 'image',
          alt: imgMatch[1],
          url: imgMatch[2]
        });
        continue;
      }

      // Empty line / paragraph
      if (line.trim() === '') {
        continue;
      }

      elements.push({
        type: 'p',
        text: line
      });
    }

    flushCode();
    flushTable();
    flushList();

    return elements;
  };

  // Render inline formatting: **bold**, *italic*, `code`, [link](url)
  const renderInline = (text) => {
    if (!text) return null;

    // Handle inline code `code`
    const codeParts = text.split(/(`[^`]+`)/g);

    return codeParts.map((part, pIdx) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={pIdx}
            style={{
              background: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.08)',
              color: isLight ? '#0284c7' : '#38bdf8',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.88em',
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Handle bold **text**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={pIdx}>
          {boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
              return (
                <strong
                  key={bIdx}
                  style={{
                    color: isLight ? '#0f172a' : '#f8fafc',
                    fontWeight: 700
                  }}
                >
                  {bPart.slice(2, -2)}
                </strong>
              );
            }
            // Handle italic *text*
            const italicParts = bPart.split(/(\*[^*]+\*)/g);
            return italicParts.map((iPart, iIdx) => {
              if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length > 2) {
                return (
                  <em
                    key={iIdx}
                    style={{
                      color: isLight ? '#475569' : '#cbd5e1'
                    }}
                  >
                    {iPart.slice(1, -1)}
                  </em>
                );
              }
              return iPart;
            });
          })}
        </span>
      );
    });
  };

  const blocks = parseMarkdown(content);

  return (
    <div
      className={`dynamic-lms-renderer ${className}`}
      style={{
        color: isLight ? '#334155' : '#e2e8f0',
        lineHeight: 1.75,
        fontSize: '0.98rem'
      }}
    >
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                style={{
                  fontSize: '1.9rem',
                  fontWeight: 800,
                  margin: '1.25rem 0 0.85rem',
                  color: isLight ? '#0f172a' : '#ffffff',
                  borderBottom: isLight ? '2px solid #e2e8f0' : '2px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.5rem',
                  letterSpacing: '-0.02em'
                }}
              >
                {renderInline(block.text)}
              </h1>
            );

          case 'h2':
            return (
              <h2
                key={idx}
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  margin: '1.25rem 0 0.65rem',
                  color: isLight ? '#1e40af' : '#93c5fd',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {renderInline(block.text)}
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={idx}
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 600,
                  margin: '1.1rem 0 0.5rem',
                  color: isLight ? '#334155' : '#c4b5fd'
                }}
              >
                {renderInline(block.text)}
              </h3>
            );

          case 'p':
            return (
              <p
                key={idx}
                style={{
                  margin: '0.75rem 0',
                  color: isLight ? '#334155' : '#cbd5e1'
                }}
              >
                {renderInline(block.text)}
              </p>
            );

          case 'quote':
            return (
              <blockquote
                key={idx}
                style={{
                  margin: '1.1rem 0',
                  padding: '0.85rem 1.25rem',
                  background: isLight ? '#f0fdf4' : 'rgba(30, 41, 59, 0.7)',
                  borderLeft: isLight ? '4px solid #10b981' : '4px solid #6366f1',
                  borderRadius: '0 8px 8px 0',
                  color: isLight ? '#065f46' : '#e2e8f0',
                  boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.05)' : '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                {renderInline(block.text)}
              </blockquote>
            );

          case 'ul':
            return (
              <ul key={idx} style={{ margin: '0.75rem 0 1rem 1.25rem', paddingLeft: '1rem', listStyleType: 'disc' }}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ margin: '0.35rem 0', color: isLight ? '#334155' : '#cbd5e1' }}>
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={idx} style={{ margin: '0.75rem 0 1rem 1.25rem', paddingLeft: '1rem', listStyleType: 'decimal' }}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ margin: '0.35rem 0', color: isLight ? '#334155' : '#cbd5e1' }}>
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );

          case 'table':
            return (
              <div
                key={idx}
                style={{
                  overflowX: 'auto',
                  margin: '1.25rem 0',
                  borderRadius: '8px',
                  border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.04)' : 'none'
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: isLight ? '#ffffff' : 'rgba(15, 23, 42, 0.6)' }}>
                  <thead>
                    {block.rows.slice(0, 1).map((row, rIdx) => (
                      <tr key={rIdx} style={{ background: isLight ? '#f8fafc' : 'rgba(30, 41, 59, 0.9)', borderBottom: isLight ? '2px solid #e2e8f0' : '2px solid rgba(255,255,255,0.1)' }}>
                        {row.map((cell, cIdx) => (
                          <th key={cIdx} style={{ padding: '0.7rem 0.95rem', color: isLight ? '#1e293b' : '#93c5fd', fontWeight: 600, fontSize: '0.9rem' }}>
                            {renderInline(cell)}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {block.rows.slice(1).map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: isLight ? '1px solid #f1f5f9' : '1px solid rgba(255,255,255,0.05)' }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{ padding: '0.7rem 0.95rem', color: isLight ? '#334155' : '#cbd5e1', fontSize: '0.88rem' }}>
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'code_block':
            return (
              <div
                key={idx}
                style={{
                  margin: '1.2rem 0',
                  borderRadius: '8px',
                  background: isLight ? '#1e293b' : '#090d16',
                  border: isLight ? '1px solid #334155' : '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.4rem 0.9rem',
                    background: isLight ? '#0f172a' : 'rgba(255, 255, 255, 0.04)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    fontFamily: 'monospace'
                  }}
                >
                  <span>{block.language || 'code'}</span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(block.content)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#38bdf8',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      padding: '2px 6px'
                    }}
                  >
                    Copy
                  </button>
                </div>
                <pre
                  style={{
                    padding: '0.95rem',
                    margin: 0,
                    overflowX: 'auto',
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: '#38bdf8'
                  }}
                >
                  <code>{block.content}</code>
                </pre>
              </div>
            );

          case 'image':
            return (
              <figure key={idx} style={{ margin: '1.5rem 0', textAlign: 'center' }}>
                <img
                  src={block.url}
                  alt={block.alt || 'Lesson Image'}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.06)' : '0 4px 16px rgba(0,0,0,0.3)',
                    display: 'inline-block'
                  }}
                  loading="lazy"
                />
                {block.alt && (
                  <figcaption style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '0.5rem', fontStyle: 'italic' }}>
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          case 'hr':
            return (
              <hr
                key={idx}
                style={{
                  margin: '1.75rem 0',
                  border: 'none',
                  height: '1px',
                  background: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)'
                }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
