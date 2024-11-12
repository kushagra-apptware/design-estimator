import React, {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react';

interface FormData {
  projectDetails?: {
    projectName?: string;
    projectDescription?: string;
  };
  projectType?: {
    projectTypes?: Array<string>;
  };
  domain?: {
    projectDomain?: Array<string>;
  };
  phase?: {
    projectStage?: Array<string>;
  };
  clientDetails?: {
    clientEmail?: string;
    clientName?: string;
  };
}

interface FormContextType {
  formData: FormData;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  setInitialStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: Dispatch<SetStateAction<string | null>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  startDay: number;
  setStartDay: Dispatch<SetStateAction<number>>;
  divRef: RefObject<HTMLDivElement>;
  spanRef: RefObject<HTMLDivElement>;
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
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [startDay, setStartDay] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);

  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPrevStep = () => setCurrentStep((prev) => prev - 1);
  const setInitialStep = () => setCurrentStep(1);
  const updateFormData = (data: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        goToNextStep,
        goToPrevStep,
        setInitialStep,
        updateFormData,
        selectedTaskId,
        setSelectedTaskId,
        isDrawerOpen,
        setIsDrawerOpen,
        startDay,
        setStartDay,
        divRef,
        spanRef
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
