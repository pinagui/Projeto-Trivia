import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe("Teste de Login", () => {
  const testIdName = "input-player-name";
  const testIdEmail = "input-gravatar-email";
  const testIdBtn = "btn-play";


  // afterEach(() => jest.clearAllMocks());

  it("Testando se a pessoa pode preencher as informações para iniciar um jogo", () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId(testIdName)).toBeInTheDocument();
    expect(screen.getByTestId(testIdEmail)).toBeInTheDocument();
    expect(screen.getByTestId(testIdBtn)).toHaveTextContent("Play");
  });

  it("Testando a validação das informações", () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(testIdName);
    const inputEmail = screen.getByTestId(testIdEmail);
    const btnPlay = screen.getByTestId(testIdBtn);
    
    expect(btnPlay).toBeDisabled();
    userEvent.type(inputEmail, "test");
    expect(btnPlay).toBeDisabled();
    userEvent.type(inputEmail, "test@test.com");
    expect(btnPlay).toBeDisabled();
    userEvent.type(inputName, "user");
    expect(btnPlay).toBeEnabled();
  });

  it("Testando o botão de iniciar um jogo", async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe("/");
    const inputName = screen.getByTestId(testIdName);
    const inputEmail = screen.getByTestId(testIdEmail);
    const btnPlay = screen.getByTestId(testIdBtn);

    userEvent.type(inputName, "user");
    userEvent.type(inputEmail, "test@test.com");
    userEvent.click(btnPlay);
    waitFor(() => {
      expect(screen.getByText("Game")).toBeInTheDocument();
      expect(history.location.pathname).toBe("/playgame");
    });
  });

  it("Testando o botão de configurações", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.click(screen.getByTestId("btn-settings"));
    expect(history.location.pathname).toBe("/settings");
  });

  it("Testando a requisição da API", async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    jest.spyOn(global, "fetch");

    const inputName = screen.getByTestId(testIdName);
    const inputEmail = screen.getByTestId(testIdEmail);
    const btnPlay = screen.getByTestId(testIdBtn);

    userEvent.type(inputEmail, "test@test.com");
    userEvent.type(inputName, "user");
    userEvent.click(btnPlay);

    expect(global.fetch).toBeCalledTimes(1);
    waitFor(() => {
      // expect(localStorage.setItem).toHaveBeenCalled();
      expect(store.getState().player.email).toBe("test@test.com");
    })
  });


});
