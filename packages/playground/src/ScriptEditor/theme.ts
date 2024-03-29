import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export const configureTheme = () => {
  monaco.editor.defineTheme("myTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [{token: ""}],
    colors: {
      "editor.background": "#000000",
      "dropdown.foreground": "#ff55c8",
      "button.foreground": "#000000",
      "dropdown.listBackground": "#000000",
      "input.background": "#000000",
      "badge.foreground": "#ff95dc",
      "activityBar.foreground": "#ff55c8",
      "activityBar.dropBorder": "#ff55c8",
      "activityBar.inactiveForeground": "#ffd4f1",
      "editorGroupHeader.tabsBackground": "#000000",
      "tab.inactiveBackground": "#000000",
      "statusBar.foreground": "#ff55c8",
      "sideBar.background": "#000000",
      "list.activeSelectionForeground": "#000000",
      "notifications.background": "#000000",
      "statusBarItem.remoteForeground": "#ff55c8",
      "notificationCenterHeader.foreground": "#ff55c8",
      "quickInput.background": "#000000",
      "editorHoverWidget.background": "#000000",
      "sideBarSectionHeader.background": "#000000",
      "editorSuggestWidget.background": "#000000",
      "editorMarkerNavigation.background": "#000000",
      "peekViewTitle.background": "#000000",
      "peekViewResult.background": "#000000",
      "panelSectionHeader.background": "#000000",
      "welcomePage.buttonBackground": "#000000",
      "editorWidget.background": "#000000",
      "quickInputTitle.background": "#000000",
      "debugToolBar.background": "#000000",
      "terminalCursor.background": "#000000",
      "checkbox.foreground": "#ff55c8",
      "activityBarBadge.background": "#000000",
      "editorCursor.background": "#000000",
      "quickInputList.focusForeground": "#000000",
      "keybindingLabel.foreground": "#000000",
      "keybindingLabel.border": "#000000",
      "keybindingLabel.bottomBorder": "#000000",
      foreground: "#ff55c8",
      focusBorder: "#ff55c8",
      "icon.foreground": "#ff55c8",
      "button.background": "#ff55c8",
      "checkbox.background": "#000000",
      "dropdown.background": "#000000",
      "input.border": "#ff55c8",
      "badge.background": "#000000",
      "progressBar.background": "#ff55c8",
      "tab.activeBorderTop": "#ff55c8",
      "tab.hoverForeground": "#ff55c8",
      "tab.activeForeground": "#ff55c8",
      "notificationCenterHeader.background": "#000000",
      "list.activeSelectionBackground": "#ff55c8",
      "statusBar.background": "#000000",
      "textLink.foreground": "#ff55c8",
      "panelTitle.activeBorder": "#ff55c8",
      "panelTitle.activeForeground": "#ff55c8",
      "settings.headerForeground": "#ff55c8",
      "editorIndentGuide.activeBackground": "#ff55c8",
      "tree.indentGuidesStroke": "#ff55c8",
      "editorLineNumber.activeForeground": "#ff55c8",
      "terminalCursor.foreground": "#ff55c8",
      "merge.border": "#ff55c8",
      "statusBarItem.remoteBackground": "#000000",
      "activityBarBadge.foreground": "#ff95dc",
      "activityBar.activeBackground": "#00000000",
      "activityBar.activeBorder": "#ff55c8",
      "activityBar.activeFocusBorder": "#ff55c8",
      "editorCursor.foreground": "#ff55c8",
      "quickInput.foreground": "#ff55c8",
      "keybindingLabel.background": "#ff55c8",
      "sideBar.border": "#541c42",
      "editorGroup.border": "#541c42",
      "editorGroupHeader.tabsBorder": "#541c42",
      "tab.border": "#541c42",
      "panel.border": "#541c42",
      "notifications.border": "#541c42",
      "notificationCenter.border": "#541c42",
      "notificationToast.border": "#541c42",
      "quickInputList.focusBackground": "#ff55c8",
      "sideBarSectionHeader.border": "#541c42",
      "editorSuggestWidget.border": "#541c42",
      "peekView.border": "#541c42",
      "tab.activeBackground": "#000000",
      "panelSection.border": "#541c42",
      "settings.focusedRowBackground": "#541c42",
      "settings.dropdownListBorder": "#541c42",
      "editorWidget.border": "#541c42",
      "welcomePage.buttonHoverBackground": "#541c42",
      "debugToolBar.border": "#541c42",
      "editorIndentGuide.background": "#541c42",
      "tab.lastPinnedBorder": "#541c42",
      "tree.tableColumnsBorder": "#541c42",
      "editorOverviewRuler.border": "#541c42",
      "editor.lineHighlightBorder": "#ff55c925",
      "peekViewEditor.background": "#ff55c925",
      "sideBar.dropBackground": "#ff55c925",
      "editorGroup.dropBackground": "#ff55c925",
      "list.dropBackground": "#ff55c925",
      "list.hoverBackground": "#ff55c925",
      "widget.shadow": "#ff55c925",
      "scrollbarSlider.background": "#ff55c925",
      "walkThrough.embeddedEditorBackground": "#ff55c925",
      "scrollbarSlider.hoverBackground": "#ff55c960",
      "list.inactiveSelectionBackground": "#ff55c960",
      "button.hoverBackground": "#d647a8",
      "pickerGroup.foreground": "#d647a8",
      "selection.background": "#802a64",
      "editor.selectionBackground": "#541c42b9",
      "searchEditor.findMatchBackground": "#802a64",
      "scrollbarSlider.activeBackground": "#802a64",
      "terminal.selectionBackground": "#802a64",
      "inputValidation.errorForeground": "#e78484",
      "textPreformat.foreground": "#ce9178cc",
      "editorBracketMatch.border": "#ff95dc",
      "extensionIcon.starForeground": "#ffd4f1",
      "editorHoverWidget.foreground": "#ffd4f1",
      "editor.foreground": "#ffd4f1",
      "textLink.activeForeground": "#ffd4f1",
      "editorLineNumber.foreground": "#ffd4f1",
      "activityBar.background": "#000000",
      "activityBar.border": "#541c42",
      "titleBar.activeBackground": "#000000",
      "titleBar.border": "#541c42",
      "window.activeBorder": "#541c42",
      "window.inactiveBorder": "#000000",
      "titleBar.inactiveBackground": "#000000",
      "titleBar.inactiveForeground": "#541c42",
      "titleBar.activeForeground": "#ff55c8",
      "menubar.selectionBackground": "#ff55c8",
      "menubar.selectionForeground": "#000000",
      "menu.selectionBackground": "#ff55c8",
      "menu.selectionForeground": "#000000",
      "menu.separatorBackground": "#ff55c8",
      "menu.background": "#000000",
      "menu.foreground": "#ff55c8",
      "button.secondaryBackground": "#000000",
      "button.secondaryForeground": "#ffd4f1",
      "button.secondaryHoverBackground": "#ffd4f111",
      "toolbar.hoverBackground": "#ff55c925",
      "toolbar.activeBackground": "#541c42",
      "editor.wordHighlightBackground": "#00000000",
      "editor.symbolHighlightBackground": "#00000000",
      "editor.selectionHighlightBackground": "#00000000",
      "editor.hoverHighlightBackground": "#ff55c925",
      "editor.rangeHighlightBackground": "#00000000",
      "editor.lineHighlightBackground": "#00000000",
      "editor.findMatchHighlightBorder": "#d647a8",
      "editor.findRangeHighlightBackground": "#ff55c925",
      "editor.selectionHighlightBorder": "#d647a8",
      "editor.wordHighlightBorder": "#d647a8",
      "editor.rangeHighlightBorder": "#d647a8",
      "editor.symbolHighlightBorder": "#d647a8",
      "editor.wordHighlightStrongBorder": "#d647a8",
      "editor.findMatchBorder": "#ffd4f1",
      "editor.findMatchBackground": "#00000000",
      "editor.findMatchHighlightBackground": "#00000000",
      "list.highlightForeground": "#ffd4f1",
      "list.activeSelectionIconForeground": "#000000",
      "statusBar.debuggingBackground": "#000000",
      "statusBar.noFolderBackground": "#000000",
      "extensionBadge.remoteBackground": "#000000",
      "editorGroup.emptyBackground": "#000000",
      "dropdown.border": "#ff55c8",
      "checkbox.border": "#ff55c8",
      "extensionBadge.remoteForeground": "#ff95dc",
      "statusBarItem.hoverBackground": "#ff55c925",
      "statusBarItem.activeBackground": "#ff55c960",
      "statusBar.debuggingForeground": "#cc6633",
      "statusBar.debuggingBorder": "#cc6633",
      "statusBar.noFolderBorder": "#a033bb",
      "statusBar.noFolderForeground": "#a033bb",
      "statusBar.border": "#541c42",
    },
  });
  monaco.editor.setTheme("myTheme");
};
