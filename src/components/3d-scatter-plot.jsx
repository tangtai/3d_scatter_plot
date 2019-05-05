import React, { Component } from "react";
import * as THREE from "three";
import "./Chart.css";

export default class Scatter extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth * 0.95;
    const height = this.mount.clientHeight * 0.95;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      2000
    );
    camera.position.z = width * 1.3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#c5eff7");
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.mount.appendChild(this.renderer.domElement);
    this.start();
    this.addStaff(this.props.data);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.orbitCam();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  orbitCam() {
    var rotSpeed = 0.015;

    var x = this.camera.position.x,
      // y = this.camera.position.y,
      z = this.camera.position.z;

    this.camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
    this.camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
    // this.camera.position.y = y * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  addStaff(data) {
    data.forEach(d => {
      var geo = new THREE.SphereGeometry(this.props.scale.rScale(d.R), 5, 5);
      var mat = new THREE.MeshBasicMaterial({
        color: this.props.scale.cScale(d.R)
      });
      var ball = new THREE.Mesh(geo, mat);
      ball.position.x = this.props.scale.xScale(d.xValue);
      ball.position.y = this.props.scale.yScale(d.yValue);
      ball.position.z = this.props.scale.zScale(d.zValue);
      this.scene.add(ball);
    });
  }

  render() {
    return (
      <div
        className="chartContainer"
        style={{
          paddingTop: "170px",
          paddingBottom: "100px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="threeDChart"
          style={{ backgroundColor: "#c5eff7" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
