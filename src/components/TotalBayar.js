import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from '../utils/constants'
import { Link } from "react-router-dom";

export default class TotalBayar extends Component {

  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs
    }


    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      console.log(res.data)
    })
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
        {/* Web */}
        <div className="d-none d-md-block">
          <Row>
            <Col>
              <h5>
                Total Harga :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <Button
                variant="primary" className="mb-2 mt-3 mr-4 block-button" size="md"
                onClick={() => this.submitTotalBayar(totalBayar)} as={Link} to='/sukses'
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>

            </Col>
          </Row>
        </div>

        {/* Mobile  */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>
                Total Harga :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <Button
                variant="primary"
                className="mb-5 mt-2 mr-2 block-button"
                size="md"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
