import React, { Component } from "react";
import http from "./httpservice";
import "./style.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
console.warn = () => {};
class MovieTiming extends Component {
  state = { data: [], fav: [], showtime: "" };
  filtershowTime = (e) => {
    const { showtime } = this.state;
    showtime = e;
    this.setState({ showtime: showtime });
  };
  fovcheck = (ind) => {
    const { fav } = this.state;
    fav.push(ind);
    console.log(ind);
    this.setState({ fav: fav });
  };
  Notfovcheck = (ind) => {
    const { fav } = this.state;
    let index = fav.findIndex((e) => e === ind);
    fav.splice(index, 1);
    console.log(ind);
    this.setState({ fav: fav });
  };
  async fetchData() {
    const { location, title, imdbid } = this.props.match.params;
    console.log(imdbid);
    let response = await http.get(`/movies/${location}/${imdbid}`);
    let { data } = response;
    console.log(data);
    this.setState({ data: data });
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  render() {
    const priceArr = ["0-100", "101-200", "201-300", "More than 300"];
    const showArr = ["Morning", "Afternoon", "Evening", "Night"];
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.toUTCString().slice(8, 11));
    const { data = [], fav, showtime } = this.state;
    const { results = {}, halls = {} } = data;
    const { genre = [] } = results;
    const { details = [] } = halls;

    return (
      <div className="p-0 me-0 border-0" style={{ margin: "" }}>
        <nav
          className="pt-3 ps-2 mb-0 sticky-top "
          style={{ backgroundColor: "#676F71" }}
        >
          <h2 className=" text-light">{results.title}</h2>
          <div className="row">
            <div className="col-sm-2 text-light h4">
              <span className="text-danger">&hearts;</span>
              {(+results.imdbrating / 10) * 100}%
            </div>
            <div className="col-sm-6 ms-4">
              {genre.map((e) => (
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm rounded-5 m-2 "
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <small className="text-white">264871 votes</small>
        </nav>
        <div className="bg-light">
          <div className="row m-2">
            <div className="col-6 ps-3">
              <div className="row">
                <div
                  className="col-2  fw-bold m-1 pt-1 pb-1 text-center "
                  style={{ backgroundColor: "#2dc492" }}
                >
                  {`${currentDay}-Today`}
                </div>
                <div
                  className="col-2  fw-bold m-1 pt-1 pb-1 text-center "
                  style={{ backgroundColor: "#2dc492" }}
                >
                  {`${+currentDay + 1}-${currentMonth}`}
                </div>
                <div
                  className="col-2  fw-bold m-1 pt-1 pb-1 text-center "
                  style={{ backgroundColor: "#2dc492" }}
                >
                  {`${+currentDay + 2}-${currentMonth}`}
                </div>
              </div>
            </div>
            <div className="col-3 border-end text-center">
              <div className="dropdown text-end ">
                <button
                  className="dropbtn btn text-dark"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                >
                  Filter Price
                  <i
                    className="fa fa-chevron-down"
                    id="onhover"
                    style={{ fontSize: "10px", color: "lightgrey" }}
                  ></i>
                </button>
                <ul
                  className="dropdown-menu position-absolute top-60 start-50"
                  aria-labelledby="dropdownMenuButton"
                >
                  {priceArr.map((e, index) => (
                    <li
                      style={{ cursor: "pointer" }}
                      key={index}
                      className="dropdown-item text-start"
                      // onClick={() => this.addlocation(e)}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-3 border-end text-center">
              <div className="dropdown text-end">
                <button
                  className="dropbtn btn text-dark"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                >
                  Filter Showtime
                  <i
                    className="fa fa-chevron-down"
                    id="onhover"
                    style={{ fontSize: "10px", color: "lightgrey" }}
                  ></i>
                </button>
                <ul
                  className="dropdown-menu position-absolute top-60 start-50"
                  aria-labelledby="dropdownMenuButton"
                >
                  {showArr.map((e, index) => (
                    <li
                      style={{ cursor: "pointer" }}
                      key={index}
                      className="dropdown-item text-start"
                      onClick={() => this.filtershowTime(e)}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="p-0 m-0">
          <div className="row m-0 p-0" style={{ backgroundColor: "#F8BB97" }}>
            <div className="col-6 border-end">
              <div className="mt-2">
                <PhoneIphoneOutlinedIcon color="success" fontSize="large" />
              </div>
              <small>M-Ticket Available</small>
            </div>
            <div className="col-6">
              <div className="mt-2">
                <FastfoodOutlinedIcon color="warning" fontSize="large" />
              </div>
              <small>Food Available</small>
            </div>
          </div>
        </div>
        {/* halls */}
        <div className="">
          {details.map((e, index) => (
            <div className="row mt-2">
              <div className="col-1 ">
                {fav.find((c) => c === index + 1) ? (
                  <FavoriteOutlinedIcon
                    className="text-danger"
                    onClick={() => this.Notfovcheck(index + 1)}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    onClick={() => this.fovcheck(index + 1)}
                  />
                )}{" "}
              </div>
              <div className="col-4">
                <div>
                  <p className="p-0 m-0 fw-bold">{e.hallName}</p>
                  <div className="row m-0 p-1">
                    <div className="col-6">
                      <div className="mt-2">
                        <PhoneIphoneOutlinedIcon
                          color="success"
                          fontSize="small"
                        />
                      </div>
                      <small>M-Ticket</small>
                    </div>
                    <div className="col-6">
                      <div className="mt-2">
                        <FastfoodOutlinedIcon
                          color="warning"
                          fontSize="small"
                        />
                      </div>
                      <small>F&B</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-7">
                {e.timings.map((e) => (
                  <button
                    className="btn btn-sm btn-outline-primary p-1 m-1"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-className="custom-tooltip"
                    title={e.price}
                  >
                    {e.time}
                  </button>
                ))}
                <p>
                  <spam className="text-danger">&#xF309;</spam>Cacellation
                  available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default MovieTiming;
