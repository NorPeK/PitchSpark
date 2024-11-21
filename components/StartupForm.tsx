"use client"
import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createPitch } from "@/lib/actions"



/**
 * A form component to submit a new startup pitch.
 *
 * This component renders a form with 4 input fields and a Markdown editor for
 * the pitch content. It uses Zod for form validation and Next.js's built-in
 * `useActionState` hook to handle form submission. The component also uses a
 * toast hook to display a success or error message after form submission.
 *
 * The component renders a success message and redirects to the newly created
 * startup page if the form submission is successful. If the submission is
 * unsuccessful, it renders an error message and displays the form errors.
 *
 * The component also renders a pending state while the form is being submitted.
 *
 * @returns A JSX element containing the form component.
 */
const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    // State to track form validation errors (field-specific).
  
    const [pitch, setPitch] = useState("");
    // State to track the Markdown pitch content entered by the user.
  
    const { toast } = useToast();
    // Destructure the `toast` method to display notifications for success or error states.
  
    const router = useRouter();
    // Router instance for navigating to the new startup page after successful form submission.

/**
 * Handles the form submission by parsing the form data and calling the
 * `createPitch` action. If the action is successful, it displays a success
 * toast and redirects to the newly created startup page. If the action is
 * unsuccessful, it displays an error toast and renders the form errors.
 *
 * @param {Object} prevState - The previous state of the component.
 * @param {FormData} formData - The form data containing the startup details.
 * @returns {Promise<Object>} A promise that resolves to the response of the
 * server action, indicating success or error status.
 */
  
const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            pitch,
        }

        await formSchema.parseAsync(formValues);
        //console.log(formValues);
        const result = await createPitch(prevState, formData, pitch);
        //console.log(result);

        if(result.status == "SUCCESS") {
            toast({
                title: "Success",
                description: "Your Startup pitch has been created successfully.",
            });
            router.push(`/startup/${result._id}`);
        }

        return result;

    } catch (error) {
        if(error instanceof z.ZodError) {
            const fieldErrors = error.flatten().fieldErrors;
            setErrors(fieldErrors as unknown as Record<string, string>);
            toast({
                title: "Error",
                description: "Please check your inputs and try again.",
                variant: "destructive",
            })
            return { ...prevState, error: "Validation Error", status: "ERROR" };
        };

        toast({
            title: "Error",
            description: "Something went wrong, unexpected error has occured.",
            variant: "destructive",
        })

        return {
            ...prevState,
            error: "Something went wrong",
            status: "ERROR",
        };
    }

  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit , {
    error: "",
    status: "INITIAL",
  });

  

  

  return (
    <form action={formAction} className="startup-form">
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input 
                id="title"
                name="title"
                className="startup-form_input"
                required
                placeholder="Startup Title"
            />
            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea 
                id="description"
                name="description"
                className="startup-form_textarea"
                required
                placeholder="Startup Description"
            />
            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>
        <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input 
                id="category"
                name="category"
                className="startup-form_input"
                required
                placeholder="Startup Category (Tech, Health, Education)"
            />
            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div>
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <Input 
                id="link"
                name="link"
                className="startup-form_input"
                required
                placeholder="Startup Image URL"
            />
            {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>
        <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>
            <MDEditor
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id="pitch"
                preview="edit"
                height={300}
                style={{borderRadius:20, overflow:"hidden"}}
                textareaProps={{
                    placeholder:"Briefly describe your idea and what problem it solves",
                }}
                previewOptions={{
                    disallowedElements: ["style"]
                }}
            />
            {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>

        <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Your Pitch"}
            <Send className="size-6 ml-2" />
        </Button>
    </form>
  )
}

export default StartupForm