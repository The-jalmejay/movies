import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import http from "./httpservice";
import ImgCarousel from "./imgcarousel";
import Navbar from "./navbar";
class Home extends Component {
  state = {
    isActive: { select: 0, format: 0, genre: 0 },
    data: [],
    options: {},
    langArr: ["Hindi", "English", "Punjabi", "Tamil"],
    formatArr: ["2D", "3D", "4DX"],
    genreArr: [
      "Action",
      "Adventure",
      "Biography",
      "Comedy",
      "Thriller",
      "Animation",
      "Drama",
      "Horror",
      "Crime",
      "Sci-Fi",
      "Mystery",
      "Sport",
      "History",
      "Documentary",
      "Biography",
      "Western",
    ],
    location: "NCR",
  };
  handleloactionToActionloc = (loc) => {
    const { location } = this.state;
    this.setState({ location: loc });
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    console.log(input.name, input.value);
    let queryParams = queryString.parse(this.props.location.search);
    let options = { ...queryParams };
    console.log(options[input.name]);
    input.type === "checkbox"
      ? (options[input.name] = this.updateCBs(
          options[input.name],
          input.checked,
          input.value
        ))
      : (options[input.name] = input.value);
    this.callURL(`/home/movies/${this.state.location}`, options);
  };
  updateCBs = (inpValues, checked, value) => {
    console.log("inp", inpValues);
    let inpArr = inpValues ? inpValues.split(",") : [];
    if (checked) inpArr.push(value);
    else {
      let index = inpArr.findIndex((ele) => ele === value);
      if (index >= 0) inpArr.splice(index, 1);
    }
    return inpArr;
  };
  activeS = (e) => {
    // console.log(e)
    let s1 = { ...this.state };
    s1.isActive.select = e;
    this.setState(s1);
  };
  activeF = (e) => {
    let s1 = { ...this.state };
    s1.isActive.format = e;
    this.setState(s1);
  };
  activeG = (e) => {
    let s1 = { ...this.state };
    s1.isActive.genre = e;
    this.setState(s1);
  };
  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    console.log(searchStr);
    let response = await http.get(
      `/movies/${this.state.location}?${searchStr}`
    );
    let { data } = response;
    // console.log(data);
    this.setState({ data: data });
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  handelonOptionChange = (options) => {
    this.callURL(`/home/movies/${this.state.location}`, options);
  };
  callURL = (url, options) => {
    console.log(options);
    let searchString = this.makeSearchString(options);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (options) => {
    let { q = "", lang = "",format="",genre="" } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "q", q);
    searchStr = this.addToQueryString(searchStr, "lang", lang);
    searchStr = this.addToQueryString(searchStr, "format", format);
    searchStr = this.addToQueryString(searchStr, "genre", genre);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
 
      moviesTiming=(d)=>{
        this.props.history.push(`/movies/${this.state.location}/${d.title}/${d.imdbid}`)
      }
      render() {
    const { isActive, data, langArr, formatArr, genreArr } = this.state;
    const { results = [] } = data;
    console.log(this.props.location);
    let queryParams = queryString.parse(this.props.location.search);
    let { lang = "", format = "", genre = "" } = queryParams;
    let lang2 = lang ? lang.split(",") : [];
    let format2 = format ? format.split(",") : [];
    let genre2 = genre ? genre.split(",") : [];
    console.log(lang2);
    console.log("query", queryParams);
    return (
      <div>
        <div className="">
          <Navbar
            onOptionChange={this.handelonOptionChange}
            options={queryParams}
            loactionToActionloc={this.handleloactionToActionloc}
          />
        </div>
        <div className="container-fluid">
          <div className="mt-3">
            <ImgCarousel />
          </div>
          <div className="d-lg-block " style={{ backgroundColor: "#f2f2f2" }}>
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className="nav-link navbar-brand fs-2 pt-0"
                        aria-current="page"
                        to="#"
                      >
                        Movies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mt-2" to="#">
                        Now Showing
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mt-2" to="#">
                        Coming Soon
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mt-2" to="#">
                        Exclusive
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="row" style={{ backgroundColor: "#f2f2f2" }}>
            <div className="col-3">
              <div className="row">
                <div className="col-10 ms-4 bg-white text-center">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/Hry1kDH/17443322900502723126.jpg"
                  />
                </div>
              </div>
              <br />
              <div className="row pe-4">
                <br />
                <div className="row ms-2  pt-2 pb-2 bg-white rounded">
                  <div
                    className={
                      "col " + isActive && isActive.select === 0
                        ? ""
                        : "text-primary "
                    }
                  >
                    {isActive && isActive.select === 0 ? (
                      <i
                        className="fa fa-chevron-down"
                        onClick={() => this.activeS(1)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-chevron-up"
                        onClick={() => this.activeS(0)}
                      ></i>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select Language
                  </div>
                  {isActive && isActive.select > 0 ? (
                    <div>
                      <div className="row">
                        {langArr.map((l, ind) => (
                          <div
                            className=" col-12 form-check text-left m-1 ml-2"
                            key={ind}
                          >
                            <input
                              type="checkbox"
                              name="lang"
                              className="form-check-input"
                              value={l}
                              checked={lang2.find((e) => e === l)}
                              onChange={this.handleChange}
                            />
                            <label className="form-check-label">{l}</label>
                          </div>
                        ))}
                      </div>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <div className="row pe-4">
                <br />
                <div className="row ms-2  pt-2 pb-2 bg-white rounded">
                  <div
                    className={
                      "col " + isActive && isActive.format === 0
                        ? ""
                        : "text-primary"
                    }
                  >
                    {isActive && isActive.format === 0 ? (
                      <i
                        className="fa fa-chevron-down"
                        onClick={() => this.activeF(1)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-chevron-up"
                        onClick={() => this.activeF(0)}
                      ></i>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Format
                  </div>
                  {isActive && isActive.format > 0 ? (
                    <div>
                      <div className="row">
                        {formatArr.map((l, ind) => (
                          <div
                            className=" col-12 form-check text-left m-1 ml-2"
                            key={ind}
                          >
                            <input
                              type="checkbox"
                              name="format"
                              className="form-check-input"
                              value={l}
                              checked={format2.find((e) => e === l)}
                              onChange={this.handleChange}
                            />
                            <label className="form-check-label" for={l}>
                              {l}
                            </label>
                          </div>
                        ))}
                      </div>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <div className="row pe-4">
                <br />
                <div className="row ms-2  pt-2 pb-2 bg-white rounded">
                  <div
                    className={
                      "col " + isActive && isActive.genre === 0
                        ? ""
                        : "text-primary"
                    }
                  >
                    {isActive && isActive.genre === 0 ? (
                      <i
                        className="fa fa-chevron-down"
                        onClick={() => this.activeG(1)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-chevron-up"
                        onClick={() => this.activeG(0)}
                      ></i>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Genre
                  </div>
                  {isActive && isActive.genre > 0 ? (
                    <div>
                      <div className="row">
                        {genreArr.map((l, ind) => (
                          <div
                            className=" col-12 form-check text-left m-1 ml-2"
                            key={ind}
                          >
                            <input
                              type="checkbox"
                              name="genre"
                              className="form-check-input"
                              value={l}
                              checked={genre2.find((e) => e === l)}
                              onChange={this.handleChange}
                            />
                            <label className="form-check-label" for={l}>
                              {l}
                            </label>
                          </div>
                        ))}
                      </div>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <br />
            </div>
            <div className="col-9">
              <div className="row">
                {results.map((d, ind) => (
                  <div className="col-3" key={ind}>
                    <div
                      className="card border-0 "
                      style={{ backgroundColor: "#f2f2f2" }}
                      onClick={()=>this.moviesTiming(d)}
                    >
                      <img
                        src={d.imageurl}
                        className="card-img-top img-fluid"
                        alt="..."
                        style={{ height: "250px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">{d.title}</h5>
                        <p className="card-text mute">{d.genre.join("/")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <br />
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}
// const qtoAction = (options) => ({ type: "Q", payload: { options: options } });
// const mapStateToProps = (state) => ({
//   location: state.location,
// });
export default Home;
