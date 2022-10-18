import React from 'react'

import Style from '../scss/Penguin.module.scss'
export default function Penguin() {
  return (
    <div>
      <div className={Style.penguin}>
        <div className={Style.penguinBottom}>
          <div className={Style.rightHand}></div>
          <div className={Style.leftHand}></div>
          <div className={Style.rightFeet}></div>
          <div className={Style.leftFeet}></div>
        </div>
        <div className={Style.penguinTop}>
          <div className={Style.rightCheeck}></div>
          <div className={Style.leftCheeck}></div>
          <div className={Style.belly}></div>
          <div className={Style.rightEye}>
            <div className={Style.sparkle}></div>
          </div>
          <div className={Style.leftEye}>
            <div className={Style.sparkle}></div>
          </div>
          <div className={Style.blushRight}></div>
          <div className={Style.blushLeft}></div>
          <div className={Style.beakTop}></div>
          <div className={Style.beakBottom}></div>
        </div>
      </div>
    </div>
  )
}
