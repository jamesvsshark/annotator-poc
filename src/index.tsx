// @ts-nocheck
import * as React from 'react';
import TextSelector from 'text-selection-react'

const HEADER_HEIGHT = 300;

const AnnotationForm = ({ setShowAnnotationForm, setInCreationMode }) => {
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <textarea style={{ height: '10em' }}></textarea>
        <div style={{ display: 'flex', marginTop: '.5em' }}>
          <button type='submit' style={{ marginRight: '.5em' }}>Save</button>
          <button type='button' onClick={() => {
            setInCreationMode(false);
            setShowAnnotationForm(false);
          }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

const AnnotationPopUp = ({ top, selectedRange, setInCreationMode }) => {
  const [showAnnotationForm, setShowAnnotationForm] = React.useState(false)

  React.useEffect(() => {
    setShowAnnotationForm(false)
  }, [top])

  const handleOnAnnotateClick = () => {
    if (selectedRange) {
      var newNode = document.createElement("span");
      newNode.setAttribute('class', 'to-annotate');
      selectedRange.surroundContents(newNode);
      setShowAnnotationForm(true);
      setInCreationMode(true);
    }
  }

  return (
    <>
      <div style={{ top: top, position: 'relative' }}>
        {showAnnotationForm && <AnnotationForm setShowAnnotationForm={setShowAnnotationForm} setInCreationMode={setInCreationMode} /> || <>
          <button onClick={handleOnAnnotateClick}>Annotate this excerpt</button>
        </>}
      </div>
    </>
  )
}

export const Annotator = ({ text }: { text: any }) => {
  const [topPos, setTopPos] = React.useState(null);
  const [selectedText, setSelectedText] = React.useState(null)
  const [selectedRange, setSelectedRange] = React.useState(null)
  const [inCreationMode, setInCreationMode] = React.useState(false)

  const handleOnMouseup = () => {
    if (!inCreationMode) {
      let selection = document.getSelection();
      let selRange = selection.getRangeAt(0);
      let selectedText = selection.toString();
      let rect = selRange.getBoundingClientRect();

      setSelectedText(selectedText)
      setTopPos(rect.top)
      setSelectedRange(selRange)
    }
  }

  React.useEffect(() => {
    window.addEventListener("mouseup", handleOnMouseup)

    return () => {
      window.removeEventListener("mouseup", handleOnMouseup)
    }
  }, [handleOnMouseup])

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 2, padding: '1rem 2rem' }}>
        <p>{text}</p>
      </div>
      <div style={{ flex: 1 }}>
        {selectedText && <AnnotationPopUp top={(topPos + window.scrollY) - HEADER_HEIGHT} selectedRange={selectedRange} setInCreationMode={setInCreationMode} />}
      </div>
    </div>
  )
}