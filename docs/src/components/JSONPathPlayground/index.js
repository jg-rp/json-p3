import React, { useEffect, useRef, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import Editor from "@monaco-editor/react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import clsx from "clsx";

import { jsonpath, version as p3version } from "@site/../dist/json-p3.esm";

const commonEditorOptions = {
  codeLens: false,
  minimap: { enabled: false },
  tabSize: 2,
  renderLineHighlight: "none",
  scrollBeyondLastLine: false,
  scrollbar: { alwaysConsumeMouseWheel: false },
  padding: { bottom: 10, top: 10 },
};

function ResultTab({ fileName, file, setFileName }) {
  return (
    <button
      className={clsx(
        "flex cursor-pointer items-center border-none px-4 py-1 text-sm font-medium",
        fileName === file.name
          ? "bg-[#F8F8FF] text-slate-700 dark:bg-[#1E1E1E] dark:text-neutral-300"
          : "bg-slate-200 text-slate-500 hover:bg-[#F8F8FF] hover:text-slate-700 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600",
      )}
      onClick={() => setFileName(fileName)}
    >
      {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-braces mr-1 h-4 w-4"
          viewBox="0 0 16 16"
        >
          <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z" />
        </svg>
      }
      {fileName}
    </button>
  );
}

export default function Playground() {
  let timer;
  const timerInterval = 1000;
  const defaultQuery = "$.users[?@.score > 85]";

  const defaultResult = JSON.stringify(
    [
      { name: "Sue", score: 100 },
      { name: "John", score: 86, admin: true },
    ],
    undefined,
    "  ",
  );

  const defaultResultNormalizedPaths = JSON.stringify(
    ["$['users'][0]", "$['users'][1]"],
    undefined,
    "  ",
  );

  const defaultData = {
    users: [
      { name: "Sue", score: 100 },
      { name: "John", score: 86, admin: true },
      { name: "Sally", score: 84, admin: false },
      { name: "Jane", score: 55 },
    ],
    moderator: "John",
  };

  const defaultDataString = JSON.stringify(defaultData, undefined, "  ");

  const [query, setQuery] = useState(defaultQuery);
  const [result, setResult] = useState(defaultResult);
  const [resultPaths, setResultPaths] = useState(defaultResultNormalizedPaths);
  const [data, setData] = useState(defaultData);

  const { colorMode } = useColorMode();
  const initTheme = colorMode === "light" ? "GitHub" : "vs-dark";

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    import("monaco-themes/themes/GitHub.json")
      .then((themeData) => {
        monaco.editor.defineTheme("GitHub", themeData);
      })
      .then((_) => {
        if (colorMode === "light") monaco.editor.setTheme("GitHub");
      });
  }

  function _onQueryChange(value) {
    try {
      setQuery(value.trim());
      const rv = jsonpath.query(value.trim(), data);
      setResult(JSON.stringify(rv.values(), undefined, "  "));
      setResultPaths(JSON.stringify(rv.paths(), undefined, "  "));
    } catch (error) {
      setResult(JSON.stringify(String(error), undefined, "  "));
      setResultPaths("[]");
    }
  }

  function onQueryChange(value) {
    clearTimeout(timer);
    timer = setTimeout(() => _onQueryChange(value), timerInterval);
  }

  function _onDataChange(value) {
    try {
      const _data = JSON.parse(value);
      setData(_data);
      const rv = jsonpath.query(query, _data);
      setResult(JSON.stringify(rv.values(), undefined, "  "));
      setResultPaths(JSON.stringify(rv.paths(), undefined, "  "));
    } catch (error) {
      setResult(JSON.stringify(String(error), undefined, "  "));
      setResultPaths("[]");
    }
  }

  function onDataChange(value) {
    clearTimeout(timer);
    timer = setTimeout(() => _onDataChange(value), timerInterval);
  }

  const files = {
    "values.json": {
      name: "values.json",
      language: "json",
      value: result,
      setter: setResult,
    },
    "paths.json": {
      name: "paths.json",
      language: "json",
      value: resultPaths,
      setter: setResultPaths,
    },
  };

  const [fileName, setFileName] = useState("values.json");
  const file = files[fileName];

  useEffect(() => {
    editorRef.current?.focus();
  }, [file.name]);

  return (
    <div className="--ifm-container-width-xl: 1536px; container">
      <div className="row">
        <div className="col">
          <h1 className="mt-5 text-xl font-light">
            JSONPath Playground <sup className="text-sm">BETA</sup>
          </h1>
          <hr className="mt-1" />
        </div>
      </div>
      <div className="row row--no-gutters">
        <div className="col h-[75vh]">
          <Allotment
            className="border border-solid border-[var(--ifm-hr-background-color)]"
            minSize={100}
            vertical
          >
            <Allotment.Pane
              className="flex flex-col bg-[#F8F8FF] dark:bg-[#1E1E1E]"
              preferredSize={60}
              maxSize={200}
              minSize={60}
            >
              <div className="flex-1">
                <Editor
                  height="100%"
                  language="text"
                  theme={initTheme}
                  defaultValue={defaultQuery}
                  onChange={onQueryChange}
                  onMount={(editor) => {
                    editor.focus();
                    editor.setPosition({
                      column: defaultQuery.length + 1,
                      lineNumber: 1,
                    });
                  }}
                  options={{
                    ...commonEditorOptions,
                    lineNumbers: "off",
                    fontSize: 15,
                    padding: { bottom: 10, top: 20 },
                  }}
                />
              </div>
            </Allotment.Pane>
            <Allotment.Pane>
              <Allotment minSize={200} horizontal>
                <Allotment.Pane
                  preferredSize="50%"
                  className="flex flex-col bg-[#F8F8FF] dark:bg-[#1E1E1E]"
                >
                  <div className="flex h-10 flex-none space-x-0 border-0 bg-slate-300 dark:bg-neutral-800">
                    <div className="flex cursor-pointer items-center border-none bg-[#F8F8FF] px-4 py-1 text-sm font-medium text-slate-700 dark:bg-[#1E1E1E] dark:text-neutral-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-braces mr-1 h-4 w-4"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z" />
                      </svg>
                      data.json
                    </div>
                  </div>
                  <div className="flex-1">
                    <Editor
                      height="100%"
                      language="json"
                      theme={initTheme}
                      defaultValue={defaultDataString}
                      onChange={onDataChange}
                      options={commonEditorOptions}
                    />
                  </div>
                </Allotment.Pane>
                <Allotment.Pane
                  preferredSize="50%"
                  className="flex flex-col bg-[#F8F8FF] dark:bg-[#1E1E1E]"
                >
                  <div className="flex h-10 flex-none space-x-0.5 border-0 bg-slate-300 dark:bg-neutral-800">
                    <ResultTab
                      fileName="values.json"
                      file={file}
                      setFileName={setFileName}
                    />
                    <ResultTab
                      fileName="paths.json"
                      file={file}
                      setFileName={setFileName}
                    />
                  </div>
                  <div className="flex-1">
                    <Editor
                      height="100%"
                      language={file.language}
                      theme={initTheme}
                      path={file.name}
                      value={file.value}
                      onChange={(value) => file.setter(value)}
                      onMount={handleEditorDidMount}
                      loading=""
                      options={{
                        ...commonEditorOptions,
                        readOnly: true,
                      }}
                    />
                  </div>
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
      <div className="row">
        <div className="col mt-1 text-center">
          <p className="text-sm">
            JSON data is on the left and results are on the right.
            <br />
            Results are updated automatically after one second of inactivity.
            <br />
            <span className="font-bold">JSON P3 Version {p3version}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
