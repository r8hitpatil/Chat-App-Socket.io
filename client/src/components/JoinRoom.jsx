import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "@/config/api";
// Removed @kit/ui/trans since it's not available; use plain text or add i18n

export function JoinRoom() {
  const formId = "modal-form";

  return (
    <div className={"container"}>
      <div className={"flex justify-center"}>
        <Dialog>
          <DialogTrigger asChild>
            <InteractiveHoverButton className="pt-3 pb-3">Join In</InteractiveHoverButton>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Room</DialogTitle>
            </DialogHeader>

            <ModalForm formId={formId} />

            <DialogFooter className={"gap-2.5"}>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>

              <Button type={"submit"} form={formId}>
                Join
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function ModalForm(props) {
  const nav = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      roomId: "",
    },
  });

  const handleSubmitData = async (data) => {
    try {
      const res = await axios.post(`${API_CONFIG.BASE_URL}/join/${data.roomId}`, { name : data.name }, {
        headers: { "Content-Type": "application/json" },
      });
      const responseData = res.data;
      if (res.status === 200 && responseData) {
        console.log(data);
        nav(`/Room/${data.roomId}`);
        form.reset();
      }
    } catch (error) {
      console.log(`Error found : ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form
        id={props.formId}
        onSubmit={form.handleSubmit(handleSubmitData)}
      >
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name{/* Replaced <Trans> with plain text */}
              </FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
          name={"name"}
        />
        <br />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Room Id{/* Replaced <Trans> with plain text */}
              </FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
          name={"roomId"}
        />
      </form>
    </Form>
  );
} // Removed extra }
