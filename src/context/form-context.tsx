import React, { createContext, ReactNode, useContext, useState } from 'react';

interface FormData {
    step1Data?: {
        projectName?: string;
        projectDescription?: string;
    };
    step2Data?: {
        projectType?: Array<string>
    };
    step3Data?: {
        projectDomain?: Array<string>
    },
    step4Data?: {
        projectStage?: Array<string>
    },
    step5Data?: {
        clientEmail?: string;
        clientName?: string;
    }
}

interface FormContextType {
    formData: FormData;
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
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
    const [formData, setFormData] = useState<FormData>({});
    console.log('formData: ', formData);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const setInitialStep = () => setCurrentStep(1)
    const updateFormData = (data: Partial<FormData>) => setFormData((prev) => ({ ...prev, ...data }));

    return (
        <FormContext.Provider value={{ formData, currentStep, nextStep, prevStep, setInitialStep,  updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};
