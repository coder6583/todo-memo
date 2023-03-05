import { Divider } from "@mui/material";
import {
  CodeComponent,
  SpecialComponents,
} from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import styles from "./Markdown.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vsDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return (
      <code
        style={{
          backgroundColor: "#dddddd",
          paddingLeft: "8px",
          paddingRight: "8px",
          borderRadius: "4px",
        }}
      >
        {children}
      </code>
    );
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  return (
    <SyntaxHighlighter style={vsDark} language={lang}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

export const MarkdownComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: ({ node, ...props }) => (
    <div style={{ width: "100%" }}>
      <h1
        style={{
          marginTop: "8px",
          fontSize: "32px",
          fontWeight: "bold",
        }}
        {...props}
      />
      <Divider style={{ width: "100%", marginBottom: "16px" }} />
    </div>
  ),
  h2: ({ node, ...props }) => (
    <div style={{ width: "100%" }}>
      <h2
        style={{
          marginTop: "4px",
          marginBottom: "4px",
          marginLeft: "2px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
        {...props}
      />
      <Divider style={{ width: "100%", marginBottom: "16px" }} />
    </div>
  ),
  h3: ({ node, ...props }) => (
    <h3
      style={{
        marginTop: "2px",
        marginBottom: "8px",
        marginLeft: "2px",
        fontSize: "18.72px",
        fontWeight: "600",
      }}
      {...props}
    />
  ),
  h4: ({ node, ...props }) => (
    <h4
      style={{
        marginTop: "2px",
        marginBottom: "8px",
        marginLeft: "2px",
        fontSize: "18.72px",
        fontWeight: "500",
      }}
      {...props}
    />
  ),
  blockquote: ({ node, ...props }) => (
    <div className={styles.markdownQuote}>{props.children}</div>
  ),
  ul: ({ node, ...props }) => (
    <ul
      style={{
        listStyle: "inherit",
        marginLeft: "40px",
        paddingTop: "8px",
      }}
    >
      {props.children}
    </ul>
  ),
  ol: ({ node, ...props }) => (
    <ol
      style={{
        listStyleType: "decimal",
        marginLeft: "40px",
        paddingTop: "8px",
      }}
    >
      {props.children}
    </ol>
  ),
  code: CodeBlock,
  pre: ({ node, ...props }) => <pre style={{}}>{props.children}</pre>,
  a: ({ node, ...props }) => (
    <a
      href={props.href}
      style={{ color: "var(--theme2)", textDecoration: "underline" }}
    >
      {props.children}
    </a>
  ),
};
