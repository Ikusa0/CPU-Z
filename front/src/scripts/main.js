import '../styles/css/reset.css'
import '../styles/css/style.css'
import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
import { fakeApi } from './api/fake_information'

const TABLE = document.querySelector('.styled-table tbody')
const SIDEBAR = document.querySelector('.sidebar__body')

TABLE.innerHTML = ''
SIDEBAR.innerHTML = ''

const generateTable = (information) => {
    for (const property of Object.keys(information)) {
        const value = information[property]
        if (typeof value === "object" && !Array.isArray(value)) {
            TABLE.innerHTML +=
                `<tr>
                    <td class="property title">${property}</td>
                </tr>`
            generateTable(value)
            continue
        }

        TABLE.innerHTML +=
            `<tr>
                <td class="property">${property}</td>
                <td>${value}</td>
            </tr>`
    }
}

const setActive = (e) => {
    e.preventDefault()
    TABLE.innerHTML = ''

    const active = document.querySelector('.sidebar__body .active')
    const componentName = e.currentTarget.querySelector('span').innerHTML
    active?.classList.remove('active')
    e.currentTarget.classList.add('active')
    generateTable(fakeApi[componentName])
}

const generateSidebar = (jsonApi) => {
    SIDEBAR.innerHTML = ''
    for (const componentName of Object.keys(jsonApi)) {
        const component = document.createElement('a')
        component.addEventListener("click", setActive)
        component.innerHTML =
            `<ion-icon class="icon" name="cog-outline"></ion-icon>
            <span>${componentName}</span>
        <ion-icon class="icon" name="chevron-forward-outline"></ion-icon>`
        SIDEBAR.appendChild(component)
    }
}

generateSidebar(fakeApi)
