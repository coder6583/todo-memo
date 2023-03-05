import { tags } from "@lezer/highlight";
import createTheme from "@uiw/codemirror-themes";

const MarkdownTheme = createTheme({
  theme: "light",
  settings: {
    fontFamily: "Consolas",
    background: "#f3f4f6 !important",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#8a919966",
  },
  styles: [{ tag: tags.heading, color: "#787b8099" }],
});

export { MarkdownTheme };
