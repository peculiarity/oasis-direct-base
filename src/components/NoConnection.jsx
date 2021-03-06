import React from 'react';

const NoConnection = () => {
  return (
    <div className="frame connectionless">
      <div className="heading">
          <h2>Not Connected to Ethereum</h2>
        </div>
      <section className="content">
          <div className="heading">
            <h3>Available clients</h3>
          </div>
          <div className="list">
            <ul>
              <li>
                <div className='icon metamask'/>
                <div>
                  <h4 className="heading"> Metamask </h4>
                  <span className="desktop"> Browser Extension</span>
                </div>
                <div>
                  <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">INSTALL</a>
                </div>
              </li>
              <li>
                <div className='icon parity'/>
                <div>
                  <h4 className="heading"> Parity </h4>
                  <span className="desktop">Ethereum client + Browser Extension</span>
                </div>
                <div>
                  <a href="https://parity.io/" target="_blank" rel="noopener noreferrer">INSTALL</a>
                </div>
              </li>
            </ul>
          </div>
        </section>
    </div>
  )
}

export default NoConnection;
