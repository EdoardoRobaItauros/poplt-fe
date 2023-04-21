import * as React from 'react';
import { JSONEditor } from "react-json-editor-viewer";
import '../App.css';

function CodeEditor(props) {

    const changeCode = (key, value, parent) => {
        props.setCode(parent)
    }

    return <JSONEditor
        className="centered"
        data={props.code}
        collapsible
        onChange={changeCode}
    />;
}

export default CodeEditor;