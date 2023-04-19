import * as React from 'react';
import { JSONEditor } from "react-json-editor-viewer";

function CodeEditor(props) {

    const changeCode = (key, value, parent) => {
        props.setCode(parent)
    }

    return <JSONEditor
        data={props.code}
        collapsible
        onChange={changeCode}
    />;
}

export default CodeEditor;