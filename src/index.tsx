// @ts-nocheck
import * as React from 'react';
import TextSelector from 'text-selection-react'

const HEADER_HEIGHT = 300;

const AnnotationForm = () => {
  return (
    <>d</>
  )
}

const AnnotationPopUp = ({ top, selectedRange }) => {
  const [showAnnotationForm, setShowAnnotationForm] = React.useState(false)

  React.useEffect(() => {
    setShowAnnotationForm(false)
  }, [top])

  const handleOnAnnotateClick = () => {
    var newNode = document.createElement("span");
    newNode.setAttribute('class', 'to-annotate');
    selectedRange.surroundContents(newNode);
    setShowAnnotationForm(true)
  }

  return (
    <>
      <div style={{ top: top, position: 'relative' }}>
        {showAnnotationForm && <AnnotationForm /> || <>
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

  const handleOnMouseup = () => {
    // console.log(document.getSelection())
    let selection = document.getSelection();
    let selRange = selection.getRangeAt(0);
    let selectedText = selection.toString();
    let rect = selRange.getBoundingClientRect();

    setSelectedText(selectedText)
    if (selectedText) {
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
        {selectedText && <AnnotationPopUp top={(topPos + window.scrollY) - HEADER_HEIGHT} selectedRange={selectedRange} />}
      </div>
    </div>
  )
}