import {
  createStyles,
  Navbar,
  Title,
  rem,
  Button,
  Group,
  Container,
  Modal,
  TextInput,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

interface FormValues {
  task: string;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  main: {
    color: "black",
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    color: "black",
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  listInfos: { marginLeft: "20px" },
}));

function App() {
  const { classes } = useStyles();

  const [modalCreateOpened, setModalOpened] = useState(false);

  const [itemSelected, setItemSelected] = useState(undefined);

  const form = useForm<FormValues>({
    initialValues: {
      task: "",
    },
  });

  useEffect(() => {
    setItemSelected(undefined);
  }, []);

  return (
    <>
      <Group style={{ justifyContent: "space-between" }}>
        <Navbar width={{ sm: 290 }}>
          <Navbar.Section grow className={classes.wrapper}>
            <div className={classes.main}>
              <Title order={4} className={classes.title}>
                TODO LIST
              </Title>

              <div className={classes.listInfos}>
                <Button
                  variant="subtle"
                  color="violet"
                  onClick={() => setModalOpened(true)}
                >
                  + Adicionar
                </Button>
              </div>
            </div>
          </Navbar.Section>
        </Navbar>

        <Container size="xs">
          {!itemSelected && (
            <Group style={{ justifyContent: "center" }}>
              <Title>Adicione ou selecione um item!</Title>

              <Button
                color="violet"
                onClick={() => setModalOpened(!modalCreateOpened)}
              >
                + Adicionar
              </Button>
            </Group>
          )}
        </Container>

        <Modal
          centered
          opened={modalCreateOpened}
          onClose={() => setModalOpened(!modalCreateOpened)}
          title="Criação de tarefa"
        >
          <TextInput
            data-autofocus
            label="Nome da Tarefa"
            placeholder="Digite uma tarefa para adicionar a lista"
            mt="md"
            {...form.getInputProps("task")}
          />
        </Modal>
      </Group>
    </>
  );
}

export default App;
