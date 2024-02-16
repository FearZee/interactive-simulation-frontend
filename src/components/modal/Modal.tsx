import { Modal } from "@mantine/core";
import { FC } from "react";

interface AppModalProps {
  opened: boolean;
  close: () => void;
  title: string;
  modalContent: React.ReactNode;
}

export const AppModal: FC<AppModalProps> = ({
  opened,
  close,
  title,
  modalContent,
}) => {
  return (
    <Modal opened={opened} onClose={close} title={title} centered size={500}>
      {modalContent}
    </Modal>
  );
};
