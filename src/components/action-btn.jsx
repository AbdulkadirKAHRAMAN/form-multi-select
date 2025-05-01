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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";



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
                        
                        
                        <Select
                          value={formData[question.key] || ""}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              [question.key]: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={question.placeholder || "Bir seçenek seçiniz"} />
                          </SelectTrigger>
                          <SelectContent>
                            {question.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                      ) : question.type==="tel" ? (
                        <Input
                        type="text"
                        name="phone"
                        maxLength={14} // toplam 14 karakter: (555)-555-5555
                        placeholder={question.placeholder}
                        value={formData.phone || ''}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '').slice(0, 10); // sadece rakam ve en fazla 10 karakter
                          const formatted = raw
                            .replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (_, a, b, c) => {
                              let result = '';
                              if (a) result += `(${a}`;
                              if (a && a.length === 3) result += `)`;
                              if (b) result += `-${b}`;
                              if (c) result += `-${c}`;
                              return result;
                            });
                      
                          setFormData((prev) => ({ ...prev, phone: formatted }));
                        }}
                        className="border w-full placeholder:text-gray-400"
                      />
                      

                      ): (
                        <Input
                          className="border w-full "
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
          <AlertDialog open={successAlertOpen} onOpenChange={setSuccessAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Başarıyla Gönderildi</AlertDialogTitle>
        </AlertDialogHeader>
        <p className="text-muted-foreground">Ön kayıt formunuz başarıyla gönderildi. Sizinle en kısa sürede iletişime geçilecektir.</p>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setSuccessAlertOpen(false)}>
            Tamam
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
