import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";
import './ListItems.css';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      renderHome: true,
      visible: false,
      results: [],
    };
  }

  handleButton = (type) => {
    this.setState({
      renderHome: type,
  });
};
  handleModal = (results) => {
    this.setState({
      visible: true,
      img_src: results.img_src,
      judul: results.namaresep,
      bahan: results.bahan,
    });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "https://api.npoint.io/e45f5677beac6ae69f5c",
      headers: {
        accept: "*/*",
      },
    })
      .then((data) => {
        console.log(data.data);
        this.setState({
            listData: data.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.renderHome)
    return (
      <div>
        <div className="topnav">

          <button
            onClick={() => this.setState({ renderHome: false })}
          >Resep</button>
          <button
            class="active"
            onClick={() => this.setState({ renderHome: true })}
          >About</button>
        </div>
        <center><h2>
          <p style={{ fontSize: 20, fontWeight: 'bold', color: '#8B4513', fontFamily: 'Segoe UI' }}>Tentang Penyusun</p>
          <img src={'./profil.jpg'} ></img>
          <p style={{ fontSize: 20, fontWeight: 'bold', color: '#8B4513', fontFamily: 'Segoe UI' }}>Ichsan Arsyi Putra</p>
          <p style={{ fontSize: 16, fontWeight: 'bold', color: '#8B4513', fontFamily: 'Segoe UI' }}>21120118120029</p>

        </h2></center>
      </div>
    );

    else
    return (
      <div>
        <div className="topnav">
        <button
              class="active"
              onClick={() => this.handleButton(false)}
            >Resep</button>
            <button
              onClick={() => this.handleButton(true)}
            >About</button>
          </div>

          <div className="boxRed">
          <center>
            <h1 style={{ fontWeight: "bolder", fontSize: 50, color: '#8B4513' }}>My Pocket Recipes</h1>
          </center>
          <Modal
            title="My Pocket Recipes"
            centered
            visible={this.state.visible}
            onOk={() => this.setState({ visible: false })}
            onCancel={() => this.setState({ visible: false })}
            width={500}
          >
            <div style={{ textAlign: "center" }}>
                <center><td rowSpan="8"><img src={this.state.img_src} alt="resep" width="128px" /></td></center>
                <p style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Segoe UI' }}>{this.state.judul}</p>
                <p style={{ fontSize: 15, fontFamily: 'Segoe UI' }}>bahan:  {this.state.bahan}</p>
            </div>
          </Modal>

           {this.state.listData.map((results) => {
            return (
              <div className="card" key={results.id}style={{ margin: 40 }}>
                <div className="card-body">
                  <center><td rowSpan="8"><img src={results.img_src} alt="resep" width="128px" /></td> </center>
                  <center><h6 className="card-title">{results.namaresep}</h6></center>                       
                </div>
                <button
                style={{ borderColor: 'transparent', borderRadius: 10, backgroundColor: '#A0522D', color: 'white' }}
                  className="button"
                  onClick={() => this.handleModal(results)}
                >
                  {" "}
                  Detail Bahan
                </button>
              </div>
            );
          })} 
        </div>
      </div>
    );
  }
}
