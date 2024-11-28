import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Asegúrate de importar tu componente Navbar

const ConditionsPage = ({ conditions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConditions, setFilteredConditions] = useState(conditions || []);

  // Filtrar condiciones en tiempo real
  useEffect(() => {
    if (searchTerm) {
      const filtered = conditions.filter((condition) =>
        condition.mental_illness.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConditions(filtered);
    } else {
      setFilteredConditions(conditions);
    }
  }, [searchTerm, conditions]);

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-md-3 col-lg-2 sidebar"
            style={{
              height: '100vh',
              overflowY: 'auto',
              backgroundColor: '#f8f9fa',
              padding: '20px',
            }}
          >
            <h3>Conditions</h3>
            <ul className="list-group">
              {conditions.map((condition) => (
                <li className="list-group-item" key={condition.id}>
                  <Link to={`/condition/${condition.id}`}>
                    {condition.mental_illness}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content */}
          <div
            style={{ marginTop: '100px', marginLeft: '230px'}}
            className="col-md-9 col-lg-10 offset-md-3 offset-lg-2"
          >
            <h1 className="my-4" style={{ textAlign: 'center' }}>
              Mental Health Conditions
            </h1>

            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Search conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Cards */}
            {filteredConditions.length > 0 ? (
              <div
                className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
                id="conditionsContainer"
              >
                {filteredConditions.map((condition) => (
                  <div className="col condition-card" key={condition.id}>
                    <div className="card h-100">
                      <img
                        src={condition.img}
                        className="card-img-top"
                        alt={condition.mental_illness}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{condition.mental_illness}</h5>
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#modal${condition.id}`}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Modal */}
                    <div
                      className="modal fade"
                      id={`modal${condition.id}`}
                      tabIndex="-1"
                      aria-labelledby={`modalLabel${condition.id}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id={`modalLabel${condition.id}`}
                            >
                              {condition.mental_illness}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <img
                              src={condition.img}
                              className="img-fluid mb-3"
                              alt={condition.mental_illness}
                            />
                            <p>{condition.description}</p>
                            <h6>Symptoms:</h6>
                            <ul>
                              {condition.symptoms.map((symptom, index) => (
                                <li key={index}>{symptom}</li>
                              ))}
                            </ul>
                            <h6>Treatment:</h6>
                            <ul>
                              {condition.treatment.map((treatment, index) => (
                                <li key={index}>{treatment}</li>
                              ))}
                            </ul>
                            <h6>How to Help:</h6>
                            <p>{condition.how_to_help}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                id="empty"
                style={{
                  display: 'block',
                  marginLeft: '35%',
                  marginTop: '5%',
                }}
              >
                <h1>Continue Browsing</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsPage;
