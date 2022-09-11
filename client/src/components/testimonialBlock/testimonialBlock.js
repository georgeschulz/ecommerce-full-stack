import './testimonialBlock.css';
import { defaultTestimonial } from './defaultTestimonial';

function TestimonialBlock({testimonials}) {
    let data = testimonials.length > 0 ? testimonials : defaultTestimonial;
    let header = testimonials.length > 0 ? 'Testimonials' : 'Raving Fans of ABC Pest'

    const content = data.map(testimonial => {
        return ( 
            <div className="testimonial" key={testimonial.testimonial_id}>
                <h5>{testimonial.name}</h5>
                <p>{testimonial.body}</p>
            </div>
        )
    });

    return (
        <div>
            <h4 className="row-center">{header}</h4>
            <div className="testimonial-container">
                {content}
            </div>
        </div>
        
    )
}

export default TestimonialBlock;