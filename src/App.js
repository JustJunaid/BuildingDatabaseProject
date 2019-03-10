import React, { Component } from 'react';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

class App extends Component {
  state = {
    buildingNumber: parseInt(0),
    floors: '',
    units: [],
  }

  invalidInput = ''

  invalidMessageReset = () => {
    const message = document.getElementById('message')
    message.innerHTML = ''
  }

  submitForm = (event) => {
    event.preventDefault()
    const unitsInString = event.target[2].value.split(',')
    const unitsInNumbers = unitsInString.map(i => i = parseInt(i))
    const floors = parseInt(event.target[1].value)

    if (floors !== unitsInNumbers.length) {
      const message = document.getElementById('message')
      message.innerHTML = 'Invalid Input'
    } 

    this.setState({
      buildingNumber: parseInt(event.target[0].innerText.slice(16, 17)),
      floors: floors,
      units: unitsInNumbers
    })
  }

  componentDidUpdate() {
    setTimeout(this.invalidMessageReset, 1500)
  }

  render() {
    let flat = document.getElementById('flat')
    if(flat) flat.innerHTML = '<div className="box"></div>'
    return (
      <div className='App'>
        <form action="" method="GET" onSubmit={this.submitForm}>
          <Fieldset legend="BUILDING NUMBER 1">
            <div className="p-grid">
              <div className="p-col-12 p-md-4">
                <div className="input">
                  <i className="pi pi-number">Total Number Of Floors: </i>
                  <div className="p-inputgroup">
                    <InputText type="number" autoFocus={true} name="floors" placeholder="Enter Here.."/>
                  </div>
                </div>

                <div className="input">
                  <i className="pi pi-number">Units On Each Floor: </i>
                  <div className="p-inputgroup">
                    <InputText name="units" placeholder="Enter Here.."/>
                  </div>
                </div>

                <div className="input">
                  <Button type="submit" label="Submit" className="p-button-raised p-button-rounded" tooltip="Click to proceed" />
                </div>

                <div className="feature-intro"><h1 style={{fontWeight: '400'}} id="message"></h1></div>

                {(this.state.floors === this.state.units.length) &&
                (
                  <div className="p-inplace p-component">
                  <div className="p-inplace-content">
                      <div className="p-datatable p-component">
                        <div className="p-datatable-wrapper">
                            <table>
                              <thead className="p-datatable-thead">
                                  <tr>
                                    <th width="10%" className=""><span className="p-column-title">Floor</span></th>
                                    <th className=""><span className="p-column-title">Units</span></th>
                                  </tr>
                              </thead>
                              <tbody className="p-datatable-tbody">
                                  {this.state.units.map((NoOfFlats, i) => {
                                    return (
                                      <tr>
                                        <td key={i}>{i+1}</td>
                                        <td key={i+1}>
                                          <div className="p-grid">
                                            <div className="p-col">
                                              <div id="flat">{'flat'.repeat(NoOfFlats)}</div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  })}
                              </tbody>
                            </table>
                        </div>
                      </div>
                  </div>
                </div>
                )}

              </div>
            </div>
          </Fieldset>
        </form>
      </div>
    );
  }
}

export default App;
