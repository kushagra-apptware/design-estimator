import React, { createContext, ReactNode, useContext, useState } from 'react';

interface FormData {
    projectDetails?: {
        projectName?: string;
        projectDescription?: string;
    };
    projectType?: {
        projectTypes?: Array<string>
    };
    domain?: {
        projectDomain?: Array<string>
    },
    phase?: {
        projectStage?: Array<string>
    },
    clientDetails?: {
        clientEmail?: string;
        clientName?: string;
    }
}

interface FormContextType {
    formData: FormData;
    currentStep: number;
    goToNextStep: () => void;
    goToPrevStep: () => void;
    setInitialStep: () => void;
    updateFormData: (data: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useForm = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useForm must be used within a FormProvider');
    }
    return context;
};

interface FormProviderProps {
    children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
        projectDetails: {
            projectName: '',
            projectDescription: ''
        },
        projectType: {
            projectTypes: []
        },
        domain: {
            projectDomain: []
        },
        phase: {
            projectStage: []
        },
        clientDetails: {
            clientName: '',
            clientEmail: ''
        }
    });
    const [currentStep, setCurrentStep] = useState<number>(1);

    const goToNextStep = () => setCurrentStep((prev) => prev + 1);
    const goToPrevStep = () => setCurrentStep((prev) => prev - 1);
    const setInitialStep = () => setCurrentStep(1)
    const updateFormData = (data: Partial<FormData>) => setFormData((prev) => ({ ...prev, ...data }));

    return (
        <FormContext.Provider value={{ formData, currentStep, goToNextStep, goToPrevStep, setInitialStep,  updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};
