import {EditorView} from "@codemirror/view"
import {StyleModule} from "style-mod"

export const externalTheme = EditorView.styleModule.of(new StyleModule({
  ".cm-mergeView": {
    overflowY: "auto",
  },
  ".cm-mergeViewEditors": {
    display: "flex",
    alignItems: "stretch",
  },
  ".cm-mergeViewEditor": {
    flexGrow: 1,
    flexBasis: 0,
    overflow: "hidden"
  },
  ".cm-merge-revert": {
    width: "1.6em",
    flexGrow: 0,
    flexShrink: 0,
    position: "relative"
  },
  ".cm-merge-revert button": {
    position: "absolute",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer"
  }
}))

export const baseTheme = EditorView.baseTheme({
  "& .cm-scroller, &": {
    height: "auto !important",
    overflowY: "visible !important"
  },

  "&.cm-merge-a .cm-changedLine": {
    backgroundColor: "rgba(255, 0, 0, .1)"
  },
  "&.cm-merge-b .cm-changedLine": {
    backgroundColor: "rgba(255, 0, 0, .1)"
  },

  "&light.cm-merge-a .cm-changedText": {
    background: "linear-gradient(#cc2200, #cc2200) bottom/100% 2px no-repeat",
  },

  "&dark.cm-merge-a .cm-changedText": {
    background: "linear-gradient(#ffaa9966, #ffaa9966) bottom/100% 2px no-repeat",
  },

  "&light.cm-merge-b .cm-changedText": {
    background: "linear-gradient(#cc2200, #cc2200) bottom/100% 2px no-repeat",
  },

  "&dark.cm-merge-b .cm-changedText": {
    background: "linear-gradient(#88ff8866, #88ff8866) bottom/100% 2px no-repeat",
  },

  ".cm-collapsedLines": {
    padding: "5px 5px 5px 10px",
    cursor: "pointer"
  },
  "&light .cm-collapsedLines": {
    color: "#444",
    background: "linear-gradient(to bottom, transparent 0, #f3f3f3 30%, #f3f3f3 70%, transparent 100%)"
  },
  "&dark .cm-collapsedLines": {
    color: "#ddd",
    background: "linear-gradient(to bottom, transparent 0, #222 30%, #222 70%, transparent 100%)"
  },

  ".cm-changeGutter": { width: "3px", paddingLeft: "1px" },
  "&light.cm-merge-a .cm-changedLineGutter": { background: "#bd1e0f" },
  "&dark.cm-merge-a .cm-changedLineGutter": { background: "#fa9" },
  "&light.cm-merge-b .cm-changedLineGutter": { background: "#bd1e0f" },
  "&dark.cm-merge-b .cm-changedLineGutter": { background: "#8f8" },
})
