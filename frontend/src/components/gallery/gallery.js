import { useState } from "react";
import nextImg from '../../assets/icons/next.png';
import previous from '../../assets/icons/back.png';
import './gallery.css';

function Gallery({ images }) {
    const [slide, setSlide] = useState(0);

    //determine bounds
    const max = images.length - 1;
    const min = 0;

    //slide numbers
    const slideNum = slide;
    const maxSlideNum = max + 1;

    //callbacks to adjust state    
    const next = () => slide >= max ? setSlide(min) : setSlide(slide + 1);
    const back = () => slide <= min ? setSlide(max) : setSlide(slide - 1);

    return (
        <div className="gallery">
            <div className="gallery-header">
                <h3>Featured Images</h3>
            </div>
            {images.map((image, i) => {
                return (
                    <div className={i === slide ? "gallery-image" : 'hidden'} key={i}>
                        <img src={`/images/services/${image.path}.${image.file_type}`} alt="service" />
                    </div> 
                )
                
            })}
            <div className="gallery-controls">
                <div className="gallery-controls-left">
                    <p>Image {slideNum + 1} / {maxSlideNum}</p>
                </div>
                <div className="gallery-controls-right">
                    <div className="back-group">
                        <img src={previous} onClick={() => back()} className={'gallery-icon'} alt="back" />
                        <p onClick={() => back()}>Back</p>
                    </div>
                    <div className="forward-group">
                        <p onClick={() => next()}>Next</p>
                        <img className={'gallery-icon'} src={nextImg} onClick={() => next()} alt="next" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;