import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
  } from "@/components/ui/alert-dialog";
  import { useAlertStore } from "@/store/alert-store";
  
  export default function AlertDialogWrapper() {
    const { isOpen, message, closeAlert } = useAlertStore();
  
    return (
      <AlertDialog open={isOpen} onOpenChange={closeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bilgilendirme</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">{message}</p>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeAlert}>Tamam</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  