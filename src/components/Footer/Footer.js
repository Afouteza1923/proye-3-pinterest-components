import "./Footer.css";

//? FOOTER
const templateFooter = () => {
    return `
      <h4>Copyright 2025 - Inspirest - Rock the Code (jmfernaal)</h4>
      `
  }
  
  const printFooterTemplate = () => {
    document.querySelector("footer").innerHTML = templateFooter()
  }
  
  printFooterTemplate();

  export default printFooterTemplate;  
  