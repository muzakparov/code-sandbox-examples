import React, { Component } from 'react'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      providerGroup: [],
    }
  }

  render() {
    let dataExist = []

    return (
      <div className="App">
        <table>
          {this.state.providerGroup && (
            <thead>
              <tr>
                <th>Number</th>
                <th>View Invoice</th>
              </tr>
            </thead>
          )}
          <tbody>
            {this.state.providerGroup &&
              this.state.providerGroup.map((provider, k) => 1)}
            <tr>
              <td>{provider.result.length}</td>
              <td>
                {
                  (dataExist = provider.result.filter(
                    dataExist => dataExist.InvDataExist === 1,
                  ))
                }{' '}
                // provider is the object of providerGroup
                {dataExist.length > 0 && ( // condition for displaying the content in the row
                  <button
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    View Invoice
                  </button>
                )}
              </td>
            </tr>
            )
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListGroup
