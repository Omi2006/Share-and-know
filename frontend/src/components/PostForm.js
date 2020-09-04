import React, {useState} from 'react'
import {FormGroup, Form, Input, Label} from 'reactstrap'

export default function PostForm() {
    const [formData, setFormData] = useState({content: '', attached: '', title: ''})

    const handleInputChange = event => {
        console.log(formData)
        const {id, value} = event.target
        setFormData(oldForm => ({...oldForm, [id]: value}))
    }
    
    const handleImageChange = event => {
        const image = event.target.files[0]
        if (!image.type.match('image.*')) {
            event.preventDefault()
            alert('You must submit an image')
            event.target.value = ''
            return null
        }
        getBase64(image, result => {
            setFormData(oldForm => ({...oldForm, attached: result}))
        })
    }

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => cb(reader.result)
        reader.onerror = () => alert('Something went wrong, try again')
    }
    return (
    <Form style={{margin: '10px'}}>
        <h6>In here you make a new post. The content will be rendered using markdown. <a href='https://www.markdowntutorial.com/' target='_blank' rel="noopener noreferrer">What is markdown and how to use it.</a></h6>
        <FormGroup>
            <Label for='title'>Title: </Label>
            <Input type='text' aria-label='title' id='title' placeholder='Title' onChange={handleInputChange} className='form-control'/>
        </FormGroup>
        <FormGroup>
            <Label for='content'>Content: </Label>
            <textarea type='text' aria-label='content' id='content' placeholder='Some good content' onChange={handleInputChange} className='form-control' rows={20} maxLength="2050"></textarea>
        </FormGroup>
        <FormGroup>
            <Label for='image'>Attach an image to go with the post: </Label>
            <input type='file' id='image-input' aria-label='attached image' onChange={e => handleImageChange(e)} accept='.jpg,.png,.jpeg,.tiff'/>
        </FormGroup>
    </Form>
    )
}