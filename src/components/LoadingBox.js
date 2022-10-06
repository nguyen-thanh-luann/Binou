import Style from '../scss/LoadingBox.module.scss'

export default function LoadingBox() {
  return (
    <div className={Style.loadingBox}>
      <div className={Style.loadingDot}></div>
      <div className={Style.loadingDot}></div>
      <div className={Style.loadingDot}></div>
      <div className={Style.loadingDot}></div>
      <div className={Style.loadingDot}></div>
    </div>
  )
}
