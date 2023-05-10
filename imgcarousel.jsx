import React, { Component } from "react";
class ImgCarousel extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleRide"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleRide"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleRide"
                data-bs-slide-to="2"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active"  >
                <img
                  src="https://i.ibb.co/ZGsJ3dh/jio-mami-21st-mumbai-film-festival-with-star-2019-02-09-2019-10-58-45-992.png"
                  className="d-block w-100"

                  alt="..."
                />
              </div>
              <div className="carousel-item " >
                <img src="https://i.ibb.co/wRr7W1P/hustlers-01-10-2019-05-09-55-486.png" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://i.ibb.co/qFWPRpF/laal-kaptaan-16-10-2019-12-48-06-721.jpg" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleRide"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleRide"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ImgCarousel;
