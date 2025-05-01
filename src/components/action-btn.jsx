"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { steps } from "@/data/wizard";
import { useState } from "react";
import { MultiSelect } from "./ui/multi-select";
import {
  Wizard,
  WizardStep,
  WizardButtons,
  useWizard,
} from "@/components/ui/wizard-step";
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";


export default function ActionButton() {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [multiSelectData, setMultiSelectData] = useState({});
  const [open, setOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleComplete = () => {
    console.log("Form gönderildi:", formData);
    setOpen(false); // dialog kapat
    setSuccessAlertOpen(true); // alert dialog göster
    setFormData({});
    setFormErrors({});
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="xl">Ön Kayıt</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-7xl">
          <DialogHeader>
            <DialogTitle>Ön Kayıt</DialogTitle>
          </DialogHeader>
          <Wizard totalSteps={steps.length}>
            {steps.map((step, index) => (
              <WizardStep
                key={index}
                step={index}
                validator={async () => {
                  const allData = { ...formData, ...multiSelectData };
                  const result = step.validate.safeParse(allData);
                  if (!result.success) {
                    const errors = result.error.flatten().fieldErrors;
                    setFormErrors(errors);
                    return false;
                  }
                  setFormErrors({});
                  setFormData((prev) => ({ ...prev, ...multiSelectData }));
                  setMultiSelectData({});
                  return true;
                }}
              >
                <form className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">
                    {step.name ?? `Aşama ${index + 1}`}
                  </h2>
                  {step.questions.map((question, qIndex) => (
                    <div key={qIndex}>
                      <label className="block font-medium mb-1">
                        {question.question}
                      </label>
                      {question.type === "multiSelect" ? (
                        <MultiSelect
                          options={question.options}
                          onValueChange={(value) =>
                            setMultiSelectData((prev) => ({
                              ...prev,
                              [question.key]: value,
                            }))
                          }
                          placeholder={question.placeholder}
                          defaultValue={multiSelectData[question.key] || []}
                        />
                      ) : question.type === "select" ? (
                        <select
                          className="border w-full placeholder:text-gray-400"
                          required={question.required}
                          name={question.key}
                          defaultValue=""
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [question.key]: e.target.value,
                            }))
                          }
                        >
                          <option value="" disabled hidden>
                            {question.placeholder || "Bir seçenek seçiniz"}
                          </option>
                          {question.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="border w-full placeholder:text-gray-400"
                          type={question.type}
                          name={question.key}
                          placeholder={question.placeholder}
                          required={question.required}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [question.key]: e.target.value,
                            }))
                          }
                        />
                      )}
                      {formErrors[question.key] && (
                        <small className="text-red-500">
                          {formErrors[question.key][0]}
                        </small>
                      )}
                    </div>
                  ))}
                </form>
              </WizardStep>
            ))}
            <WizardButtons
              onComplete={handleComplete}
              nextText="İleri"
              prevText="Geri"
              completeText="Gönder"
            />
       
          </Wizard>
        </DialogContent>
      </Dialog>

    </>
  );
}
