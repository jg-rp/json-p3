import React from "react";
import { useState } from "react";
import Layout from "@theme/Layout";

import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import Editor from "@monaco-editor/react";

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
      height="8vh"
      language="text"
      theme={theme}
      defaultValue={defaultQuery}
      onChange={onChange}
      options={{ ...commonEditorOptions }}
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
      height="70vh"
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
      height="70vh"
      language="json"
      theme={theme}
      value={result}
      options={{
        ...commonEditorOptions,
        wordWrap: "on",
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
  const [data, setData] = useState(defaultData);

  function _onQueryChange(value) {
    try {
      const path = jsonpath.compile(value.trim());
      setQuery(path);
      const rv = path.query(data).values();
      setResult(JSON.stringify(rv, undefined, "  "));
    } catch (error) {
      setResult(JSON.stringify(String(error), undefined, "  "));
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
      const rv = query.query(_data).values();
      setResult(JSON.stringify(rv, undefined, "  "));
    } catch (error) {
      setResult(JSON.stringify(String(error), undefined, "  "));
    }
  }

  function onDataChange(value) {
    clearTimeout(timer);
    timer = setTimeout(() => _onDataChange(value), timerInterval);
  }

  return (
    <Layout title="Playground" description="JSONPath playground">
      <Container maxWidth="xl">
        <Grid container spacing={1} sx={{ m: 1 }}>
          <Grid xs={12}>
            <h2>JSONPath Query</h2>
            <Paper square>
              <QueryEditor
                defaultQuery={defaultQuery}
                onChange={onQueryChange}
              />
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <h2>JSON Data</h2>
            <Paper square>
              <JSONEditor onChange={onDataChange} />
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <h2>Query Results</h2>
            <Paper square>
              <ResultsEditor result={result} />
            </Paper>
          </Grid>
        </Grid>
        <p>Version {p3version}</p>
      </Container>
    </Layout>
  );
}
