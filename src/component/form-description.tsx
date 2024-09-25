
interface FormDescriptionProps {
    title: string;
    description: string;
}

const FormDescription = ({ title, description }: FormDescriptionProps) => {
  return (
    <div className="form-description-container">
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
  )
}

export default FormDescription