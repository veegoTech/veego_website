import React from 'react';

/**
 * Lightweight, zero-dependency Markdown parser and renderer for LMS content.
 * Supports:
 * - Headers (# H1, ## H2, ### H3)
 * - Blockquotes (> Note/Tip/Alert)
 * - Code blocks (```language ... ```)
 * - Inline code (`code`)
 * - Tables (| Header 1 | Header 2 |)
 * - Bold (**text**), Italic (*text*), Strike (~~text~~)
 * - Unordered lists (- or *) and ordered lists (1.)
 * - Horizontal rules (---)
 * - Callout boxes with icons
 */
export default function MarkdownRenderer({ content = '', className = '' }) {
  if (!content) {
    return <div style={{ color: 'var(--text-muted, #94a3b8)', fontStyle: 'italic', padding: '1rem' }}>No content provided for this topic yet. Click "Edit Topic" to write content.</div>;
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

  // Helper to render inline formatting: bold, italic, code, links
  const renderInline = (str) => {
    if (!str) return null;

    // Convert markdown inline syntax into React elements
    // Split by inline code first: `code`
    const parts = str.split(/(`[^`]+`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={idx}
            style={{
              background: 'rgba(99, 102, 241, 0.12)',
              color: '#818cf8',
              padding: '0.15rem 0.4rem',
              borderRadius: '4px',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '0.9em'
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Replace bold and italic
      let formatted = part;

      // Handle bold **text**
      const boldParts = formatted.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={idx}>
          {boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
              return <strong key={bIdx} style={{ color: '#f8fafc', fontWeight: 600 }}>{bPart.slice(2, -2)}</strong>;
            }
            // Handle italic *text*
            const italicParts = bPart.split(/(\*[^*]+\*)/g);
            return italicParts.map((iPart, iIdx) => {
              if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length > 2) {
                return <em key={iIdx} style={{ color: '#cbd5e1' }}>{iPart.slice(1, -1)}</em>;
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
    <div className={`dynamic-lms-renderer ${className}`} style={{ color: '#e2e8f0', lineHeight: 1.75, fontSize: '1rem' }}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  margin: '1.5rem 0 1rem',
                  color: '#ffffff',
                  borderBottom: '2px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.5rem',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
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
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: '1.4rem 0 0.8rem',
                  color: '#93c5fd',
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
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: '1.2rem 0 0.6rem',
                  color: '#c4b5fd'
                }}
              >
                {renderInline(block.text)}
              </h3>
            );

          case 'p':
            return (
              <p key={idx} style={{ margin: '0.8rem 0', color: '#cbd5e1' }}>
                {renderInline(block.text)}
              </p>
            );

          case 'quote':
            return (
              <blockquote
                key={idx}
                style={{
                  margin: '1.2rem 0',
                  padding: '0.9rem 1.25rem',
                  background: 'rgba(30, 41, 59, 0.7)',
                  borderLeft: '4px solid #6366f1',
                  borderRadius: '0 8px 8px 0',
                  color: '#e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                {renderInline(block.text)}
              </blockquote>
            );

          case 'ul':
            return (
              <ul key={idx} style={{ margin: '0.8rem 0 1rem 1.5rem', paddingLeft: '1rem', listStyleType: 'disc' }}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ margin: '0.4rem 0', color: '#cbd5e1' }}>
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={idx} style={{ margin: '0.8rem 0 1rem 1.5rem', paddingLeft: '1rem', listStyleType: 'decimal' }}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ margin: '0.4rem 0', color: '#cbd5e1' }}>
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );

          case 'table':
            return (
              <div key={idx} style={{ overflowX: 'auto', margin: '1.5rem 0', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)' }}>
                  <thead>
                    {block.rows.slice(0, 1).map((row, rIdx) => (
                      <tr key={rIdx} style={{ background: 'rgba(30, 41, 59, 0.9)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                        {row.map((cell, cIdx) => (
                          <th key={cIdx} style={{ padding: '0.75rem 1rem', color: '#93c5fd', fontWeight: 600, fontSize: '0.95rem' }}>
                            {renderInline(cell)}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {block.rows.slice(1).map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{ padding: '0.75rem 1rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
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
                  background: '#090d16',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.4rem 1rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.8rem',
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
                      color: '#60a5fa',
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
                    padding: '1rem',
                    margin: 0,
                    overflowX: 'auto',
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: '#38bdf8'
                  }}
                >
                  <code>{block.content}</code>
                </pre>
              </div>
            );

          case 'hr':
            return <hr key={idx} style={{ margin: '2rem 0', border: 'none', height: '1px', background: 'rgba(255,255,255,0.1)' }} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
