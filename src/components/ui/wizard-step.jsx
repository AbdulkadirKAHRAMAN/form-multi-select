"use client"

import React, { useState, useCallback, useEffect, useMemo, useContext } from "react"
import { ChevronLeft, ChevronRight, Check, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const WizardContext = React.createContext(undefined)

const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a Wizard");
  }
  const { step, setStep, totalSteps } = context;

  return {
    ...context,
    setComplete: () => {
      setStep(totalSteps);
    },
  };
};





function Wizard({ initialStep = 0, totalSteps, children, className }) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isComplete, setIsComplete] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState([])
  const [stepValidators, setStepValidators] = useState({})
  const [submittedData, setSubmittedData] = useState(null)

  const registerStep = useCallback((step, isVisible) => {
    setVisibleSteps((prev) => {
      if (isVisible && !prev.includes(step)) {
        return [...prev, step].sort((a, b) => a - b)
      } else if (!isVisible && prev.includes(step)) {
        return prev.filter((s) => s !== step)
      }
      return prev
    })
  }, [])

  const setStepValidator = useCallback((step, validator) => {
    setStepValidators((prev) => ({ ...prev, [step]: validator }))
  }, [])

  const validateStep = useCallback(async (step) => {
    const validator = stepValidators[step]
    if (validator) {
      return await validator()
    }
    return true
  }, [stepValidators])

  const goToStep = useCallback(async (step) => {
    if (visibleSteps.includes(step)) {
      const isValid = await validateStep(currentStep)
      if (isValid) {
        setCurrentStep(step)
      }
    } else if (visibleSteps.length > 0) {
      const closestStep = visibleSteps.reduce((prev, curr) =>
        Math.abs(curr - step) < Math.abs(prev - step) ? curr : prev
      )
      setCurrentStep(closestStep)
    }
  }, [visibleSteps, validateStep, currentStep])

  const nextStep = useCallback(async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      const currentIndex = visibleSteps.indexOf(currentStep)
      if (currentIndex < visibleSteps.length - 1) {
        setCurrentStep(visibleSteps[currentIndex + 1])
        return true
      }
    }
    return false
  }, [currentStep, visibleSteps, validateStep])

  const prevStep = useCallback(() => {
    const currentIndex = visibleSteps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(visibleSteps[currentIndex - 1])
    }
  }, [currentStep, visibleSteps])

  const reset = useCallback(() => {
    setCurrentStep(initialStep)
    setIsComplete(false)
    setSubmittedData(null)
  }, [initialStep])
  const setComplete = useCallback(() => {
    setIsComplete(true)
  }, [])
  

  const currentStepIndex = visibleSteps.indexOf(currentStep)
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === visibleSteps.length - 1 && visibleSteps.length > 0

  const value = useMemo(() => ({
    currentStep,
    totalSteps,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    isComplete,
    setComplete, 
    
    visibleSteps,
    registerStep,
    validateStep,
    setStepValidator,
    reset,
    submittedData,
    setSubmittedData
  }), [
    currentStep, totalSteps, goToStep, nextStep, prevStep,
    isFirstStep, isLastStep, isComplete, visibleSteps,
    registerStep, validateStep, setStepValidator, reset, submittedData, setComplete // Buraya da ekle
  ])

  return (
    <WizardContext.Provider value={value}>
      <div className={cn("wizard-container", className)}>
        {isComplete ? <WizardThankYou /> : children}
      </div>
    </WizardContext.Provider>
  )
}

function WizardStep({ step, children, className, shouldShow = () => true, validator, fieldNames = [] }) {
  const { currentStep, registerStep, setStepValidator } = useWizard()
  const isVisible = shouldShow()

  useEffect(() => {
    registerStep(step, isVisible)
    if (validator) {
      setStepValidator(step, validator)
    }
    return () => registerStep(step, false)
  }, [step, isVisible, registerStep, setStepValidator, validator])

  if (!isVisible || step !== currentStep) return null

  return (
    <div className={cn("wizard-step", className)} data-fields={fieldNames.join(",")}>
      {children}
    </div>
  )
}

function WizardNavigation({ className }) {
  const { currentStep, visibleSteps, goToStep } = useWizard()

  return (
    <div className={cn("flex items-center justify-center space-x-2 my-4", className)}>
      {visibleSteps.map((step) => (
        <button
          key={step}
          type="button"
          onClick={() => goToStep(step)}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            currentStep === step ? "bg-primary" : "bg-muted",
            visibleSteps.indexOf(currentStep) > visibleSteps.indexOf(step) && "bg-primary/70"
          )}
          aria-label={`Go to step ${visibleSteps.indexOf(step) + 1}`}
        />
      ))}
    </div>
  )
}

function WizardProgress({ className }) {
  const { currentStep, visibleSteps, goToStep } = useWizard()

  return (
    <div className={cn("flex items-center justify-center space-x-2 my-4", className)}>
      {visibleSteps.map((step, index) => {
        const isActive = currentStep === step
        const isCompleted = visibleSteps.indexOf(currentStep) > visibleSteps.indexOf(step)

        return (
          <div key={step} className="flex items-center">
            {index > 0 && (
              <div className={cn("h-0.5 w-10", visibleSteps.indexOf(currentStep) >= index ? "bg-primary" : "bg-muted")} />
            )}
            <button
              type="button"
              onClick={() => goToStep(step)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                isActive && "border-primary bg-primary text-primary-foreground",
                isCompleted && "border-primary bg-primary/20 text-primary",
                !isActive && !isCompleted && "border-muted bg-background"
              )}
              aria-label={`Go to step ${index + 1}`}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-sm font-medium">{index + 1}</span>}
            </button>
          </div>
        )
      })}
    </div>
  )
}

function WizardButtons({ className, onComplete, completeText = "Complete", nextText = "Next", prevText = "Back" }) {
  const { nextStep, prevStep, isFirstStep, isLastStep, validateStep, currentStep, visibleSteps, setComplete } = useWizard()
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = async () => {
    setIsLoading(true)
    try {
      if (isLastStep) {
        const isValid = await validateStep(currentStep)
        if (isValid && onComplete) {
          onComplete(visibleSteps)
          setComplete(true)
        }
      } else {
        await nextStep()
      }
    } catch (error) {
      console.error("Navigation error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex justify-between mt-8", className)}>
      <button
        type="button"
        onClick={prevStep}
        className={cn(
          "flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          isFirstStep ? "invisible" : "bg-muted hover:bg-muted/80"
        )}
        disabled={isFirstStep || isLoading}
      >
        <ChevronLeft className="h-4 w-4" />
        {prevText}
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isLastStep ? completeText : nextText}
        {!isLastStep && !isLoading && <ChevronRight className="h-4 w-4" />}
      </button>
    </div>
  )
}

function WizardThankYou() {
  const { reset, submittedData } = useWizard()

  return (
    <div className="text-center py-8 space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="h-8 w-8 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold">Thank You!</h2>
      <p className="text-muted-foreground">Your project has been successfully set up. We'll be in touch soon!</p>

      {submittedData && (
        <div className="mt-6 text-left bg-muted/50 p-4 rounded-md max-w-md mx-auto">
          <h3 className="font-medium mb-2">Project Summary:</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {submittedData.projectDetails?.projectName}</p>
            <p><span className="font-medium">Type:</span> {submittedData.projectDetails?.projectType}</p>
            <p><span className="font-medium">Contact:</span> {submittedData.personalInfo?.email}</p>

            {submittedData.projectDetails?.projectType === "business" && submittedData.businessDetails && (
              <div className="mt-2">
                <p><span className="font-medium">Company:</span> {submittedData.businessDetails.companyName}</p>
                <p><span className="font-medium">Industry:</span> {submittedData.businessDetails.industry}</p>
              </div>
            )}

            {submittedData.projectDetails?.projectType === "nonprofit" && submittedData.nonprofitDetails && (
              <div className="mt-2">
                <p><span className="font-medium">Organization:</span> {submittedData.nonprofitDetails.organizationName}</p>
                <p><span className="font-medium">Cause:</span> {submittedData.nonprofitDetails.cause}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Start Over
      </button>
    </div>
  )
}

export {
  Wizard,
  WizardStep,
  WizardNavigation,
  WizardProgress,
  WizardButtons,
  useWizard
  
}
