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
import { ShimmerButton } from "./magicui/shimmer-button";
import API_CONFIG from "../config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Removed @kit/ui/trans since it's not available; use plain text or add i18n

export function CreateRoom() {
  const formId = "modal-form";

  return (
    <div className="w-full flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <ShimmerButton className="px-6 md:px-8 text-sm md:text-base w-full max-w-[140px] md:w-auto md:max-w-none flex items-center justify-center">
            Create Room
          </ShimmerButton>
        </DialogTrigger>

        <DialogContent className="w-[95vw] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>Create Room</DialogTitle>
            </DialogHeader>

            <ModalForm formId={formId} />

            <DialogFooter className={"gap-2.5"}>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>

              <Button type={"submit"} form={formId}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
      const res = await axios.post(API_CONFIG.CREATE_ROOM, data, {
        headers: { "Content-Type": "application/json" },
      });
      const responseData = res.data;
      if (res.status === 201 && responseData) {
        console.log(data);
        nav(`/Room/${data.roomId}`);
        form.reset();
      }
    } catch (error) {
      console.log(`Error found : ${error.message}`);
    }
  };

  return (
    <Form {...form} className="relative w-[350px] overflow-hidden">
      <form id={props.formId} onSubmit={form.handleSubmit(handleSubmitData)}>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name {/* Replaced <Trans> with plain text */}
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
                Room Id {/* Replaced <Trans> with plain text */}
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
