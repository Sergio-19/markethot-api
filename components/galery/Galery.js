
const Galery = ({next, prev, count, arr, images, hideOverlay, overlay}) => {

    const classes = ["galery__overlay"]
    const cl = ["galery"]

    if(overlay){
        classes.push("galery__overlay-show")
        cl.push("galery__show")
    }

    return (
        <>
        <div className= {classes.join(' ')}></div>
        <div className= {cl.join(' ')}>
            <div className="galery__image-wrapper">
                <div className="galery__image-wrapper-control">
                    <i className="fa fa-times" onClick={hideOverlay}/>
                </div>
                <div className="galery__image-content">
                  <i className="fa fa-chevron-left" onClick = {()=> prev(count, arr)}/>  
                  <img src= {images[count]}/>   
                  <i className="fa fa-chevron-right" onClick = {()=> next(count, arr)}/> 
                </div>
                
            </div>
        </div>
        </>
        
    )
}

export default Galery