// function customRender(reactElement,container){
//     const domElement = document.createElement(reactElement.type)
//     domElement.innerHTML = reactElement.children
//     domElement.setAttribute('href', reactElement.props.href)
//     domElement.setAttribute('target', reactElement.props.target)
//     container.appendChild(domElement)
// }

// use loop to set attrebutes  for more attributes
function customRender(reactElement,container){
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    for (const attr in reactElement.props) {
        if (attr ==='children') continue;
        domElement.setAttribute(attr,reactElement.props[attr])
            
        }
        container.appendChild(domElement)
    }

const reactElement = {
    type: 'a',
    props: {
        href: 'https://www.react.dev',
        target:"_blank",
        hreflang: 'en'
    },
    children: 'Click me to visit React.dev for Learning Guide'
}

const mainContainer = document.querySelector('#root');

customRender(reactElement,mainContainer);