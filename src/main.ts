import { MergeView } from './mergeView/src';
import { json } from '@codemirror/lang-json'
import { EditorView, basicSetup } from 'codemirror'

import { HttpService } from './httpService';

const httpService = new HttpService()
let asPlannedAAS = ""
let asIsAAS = ""
let diff = true
let isMainPage = true
let asPlannedAASJSON
let asIsAASJSON
let measureRangePlanned = ""
let measureRangeIs = ""
let initial_load = true
pull(true)

// every 5 seconds

setInterval(() => {
  try {
    pull(false)
    if (initial_load) {
      initial_load = false
      switchToMainPage()
    }
  } catch (e) {
    console.error(e);
  }}, 2000)

const fixedWidthEditor = EditorView.theme({
  "&": {width: "75vw"},
  ".cm-scroller": {overflow: "auto"}
})

let editor = new MergeView({
  a: { 
    doc: asPlannedAAS, 
    extensions: [
      fixedWidthEditor,
      basicSetup, 
      json()] 
  },
  b: { 
    doc: asIsAAS, 
    extensions: [
      fixedWidthEditor,
      basicSetup, 
      json()] 
  },
  parent: document.querySelector("#editor")!,
  revertControls: "b-to-a",
  collapseUnchanged: {},
  highlightChanges: true,
  gutter: true
})

/*
let btnSave = document.getElementById("save");
btnSave!.addEventListener("click", async () => {
  try {
    asPlannedAAS = await httpService.updateAsPlannedAAS(editor.a.state.doc.toString())
    updateMergeView()
  } catch (error) {
    console.log(error)
  }  
})

let btnLoad = document.getElementById("load");
btnLoad!.addEventListener("click", async () => {
  try {
  /*
  asIsAAS = await httpService.getAsIsAAS()
  let update = editor.b.state.update({changes: {from: 0, to: editor.b.state.doc.length, insert: asIsAAS}})
  editor.dispatch(update, editor.b)
  */
/*
  updateMergeView()
  } catch (error) {
    console.log(error)
  }
})
*/

async function pull(differ: boolean) {
  asPlannedAAS = JSON.stringify(JSON.parse(await httpService.getAsPlannedAAS()), null, 4)
  asIsAAS = JSON.stringify(JSON.parse(await httpService.getAsIsAAS()), null ,4)
  if (differ) {
    let temp = JSON.parse(await httpService.getAsIsAAS())
    asIsAAS = JSON.stringify(temp, null, 4)
  }
  console.log()
  diff = asPlannedAAS.split("\n").slice(5).join("\n") != asIsAAS.split("\n").slice(5).join("\n")
  console.log(diff)
  if (diff) {
    if (!isMainPage) {
      updateMergeView()
    } else {
      updateMeasuringRange()
    }
  } else {
    if (isMainPage) {
      document.getElementById("ring")!.style.display = "block";
      document.getElementById("differ")!.style.display = "none";
    }
  }
}

let btnSwitch = document.getElementById("switch");
btnSwitch!.addEventListener("click", async () => {
  if (isMainPage) {
    isMainPage = false
    switchToMergeView()
  } else {
    isMainPage = true
    switchToMainPage()
  }
})

async function switchToMainPage() {
  updateMeasuringRange()
  document.getElementById("compare")!.style.display = "block"
  document.getElementById("valueDisplay")!.style.display = "flex"
  document.getElementById("container")!.style.display = "none"
  document.getElementById("sensor-img")!.style.display = "block"
}

async function switchToMergeView() {
  updateMergeView()
  document.getElementById("compare")!.style.display = "none"
  document.getElementById("ring")!.style.display = "none"
  document.getElementById("differ")!.style.display = "none"
  document.getElementById("valueDisplay")!.style.display = "none"
  document.getElementById("container")!.style.display = "block"
  document.getElementById("sensor-img")!.style.display = "none"
}

async function updateMeasuringRange() {
  if (diff) {
    document.getElementById("ring")!.style.display = "none";
    document.getElementById("differ")!.style.display = "block";
  } else {
    document.getElementById("ring")!.style.display = "block";
    document.getElementById("differ")!.style.display = "none";
  }

  asPlannedAASJSON = JSON.parse(asPlannedAAS)
  asIsAASJSON = JSON.parse(asIsAAS)
  measureRangePlanned = "" + asPlannedAASJSON.submodelElements[1].value.toString() + " - " + asPlannedAASJSON.submodelElements[2].value.toString()
  measureRangeIs = "" + asIsAASJSON.submodelElements[1].value.toString() + " - " + asIsAASJSON.submodelElements[2].value.toString()
  document.getElementById("measureRangePlanned")!.innerHTML = measureRangePlanned + " °C";
  document.getElementById("measureRangeIs")!.innerHTML = measureRangeIs + " °C";
}

async function updateMergeView() {
   //Temporary fix as MergeView.dispatch is not working properly
  editor.destroy()
  editor = new MergeView({
    a: { 
      doc: asPlannedAAS, 
      extensions: [
        fixedWidthEditor, 
        json()] 
    },
    b: { 
      doc: asIsAAS, 
      extensions: [
        fixedWidthEditor, 
        json()] 
    },
    parent: document.querySelector("#editor")!,
    revertControls: "b-to-a",
    collapseUnchanged: {margin: 5},
    highlightChanges: true,
    gutter: true
  })
}
