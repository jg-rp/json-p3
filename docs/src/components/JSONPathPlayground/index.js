import React from "react";
import { useState } from "react";

import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Editor from "@monaco-editor/react";

import { Allotment } from "allotment";
import "allotment/dist/style.css";

import styles from "./styles.module.css";

import { jsonpath, version as p3version } from "json-p3/dist/json-p3.esm";

const commonEditorOptions = {
  codeLens: false,
  minimap: { enabled: false },
  tabSize: 2,
  renderLineHighlight: "none",
  scrollBeyondLastLine: false,
  scrollbar: { alwaysConsumeMouseWheel: false },
  padding: { bottom: 10, top: 10 },
};

const theme = "vs-dark";

// function handleEditorDidMount(editor, monaco) {
//   import("monaco-themes/themes/Tomorrow-Night-Eighties.json")
//     .then((themeData) => {
//       monaco.editor.defineTheme("Tomorrow-Night-Eighties", themeData);
//     })
//     .then((_) => monaco.editor.setTheme("Tomorrow-Night-Eighties"));
// }

function QueryEditor({ defaultQuery, onChange }) {
  return (
    <Editor
      height="100%"
      language="text"
      theme={theme}
      defaultValue={defaultQuery}
      onChange={onChange}
      options={{ ...commonEditorOptions, fontSize: 16 }}
    />
  );
}

function JSONEditor({ onChange }) {
  const defaultValue = JSON.stringify(
    {
      users: [
        { name: "Sue", score: 100 },
        { name: "John", score: 86, admin: true },
        { name: "Sally", score: 84, admin: false },
        { name: "Jane", score: 55 },
      ],
      moderator: "John",
    },
    undefined,
    "  ",
  );

  return (
    <Editor
      height="100%"
      language="json"
      theme={theme}
      defaultValue={defaultValue}
      onChange={onChange}
      options={{ ...commonEditorOptions }}
    />
  );
}

function ResultsEditor({ result }) {
  return (
    <Editor
      height="100%"
      language="json"
      theme={theme}
      value={result}
      options={{
        ...commonEditorOptions,
        wordWrap: "on",
        lineNumbers: "off",
        readOnly: true,
      }}
    />
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

  const [query, setQuery] = useState(jsonpath.compile(defaultQuery));
  const [result, setResult] = useState(defaultResult);
  const [resultPaths, setResultPaths] = useState(defaultResultNormalizedPaths);
  const [data, setData] = useState(defaultData);

  function _onQueryChange(value) {
    try {
      const path = jsonpath.compile(value.trim());
      setQuery(path);
      const rv = path.query(data);
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
      const rv = query.query(_data);
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

  return (
    <Container maxWidth="xl" className="playground">
      <Grid container spacing={1} sx={{ m: 1 }}>
        <Grid xs={12}>
          <h1 className={styles.heading}>JSONPath Playground</h1>
          <hr sx={{ m: 1 }} />
        </Grid>
        <Grid xs={12} sx={{ height: "70vh" }}>
          <Allotment minSize={100} vertical>
            <Allotment.Pane preferredSize={60} maxSize={200} minSize={60}>
              <QueryEditor
                defaultQuery={defaultQuery}
                onChange={onQueryChange}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <Allotment minSize={200} horizontal>
                <Allotment.Pane preferredSize="50%">
                  <JSONEditor onChange={onDataChange} />
                </Allotment.Pane>
                <Allotment.Pane preferredSize="50%">
                  <ResultsEditor result={result} />
                </Allotment.Pane>
                <Allotment.Pane minSize={0} preferredSize="0%" priority="low">
                  <ResultsEditor result={resultPaths} />
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
          </Allotment>
        </Grid>
        <Grid xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            <p>
              JSON data is on the left and results are on the right.
              <br />
              Drag out the third pane on the right to see a normalized path for{" "}
              each result.
              <br />
              Results are updated automatically after one second of inactivity.
              <br />
              <span className={styles.version}>
                JSON P3 Version {p3version}
              </span>
            </p>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
