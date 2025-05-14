
import * as React from "react";
import { toast as sonnerToast, type ToastT } from "sonner";

// Define types for our toast system
export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
  duration?: number;
};

// Create a type that merges our custom properties with Sonner's options
export type ToasterToast = ToastProps & {
  id: string;
};

const toastActionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof toastActionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case toastActionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };

    case toastActionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case toastActionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }

    case toastActionTypes.REMOVE_TOAST: {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }

    default:
      return state;
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    toasts: state.toasts,
    toast: (props: ToastProps) => {
      const id = genId();
      const variant = props.variant || "default";
      const duration = props.duration || 5000;

      const update = (props: ToastProps) => {
        dispatch({
          type: toastActionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        });
      };

      const dismiss = () => {
        dispatch({ type: toastActionTypes.DISMISS_TOAST, toastId: id });
      };

      dispatch({
        type: toastActionTypes.ADD_TOAST,
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open: boolean) => {
            if (!open) dismiss();
          },
        },
      });

      // Also trigger the sonner toast for immediate visual feedback
      sonnerToast(props.title as string, {
        description: props.description as React.ReactNode,
        duration: duration,
      });

      return {
        id,
        dismiss,
        update,
      };
    },
  };
}

export { toast as sonnerToast } from "sonner";

// Create a toast function that can be imported directly
export const toast = (props: ToastProps) => {
  const { toast: toastFn } = useToast();
  return toastFn(props);
};
