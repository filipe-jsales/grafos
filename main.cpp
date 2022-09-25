#include "Conta.h"
#include "Conta.cpp"
using std::cout;
using std::string;


int main()
{
    cout << "Tipos de Contas Bancarias: \n";
    Conta::exibirTiposDeConta();
    cout << "Tipos de Situacao Cadastral: \n";
    Conta::exibirTiposDeSituacaoCadastral();
    
    
    Conta conta1("12345", "01818");
    Conta conta2("1", "2");
    Conta *contaPtr;
    Conta *contaPtr1;
    Conta *contaPtr2;
    Conta *contaPtr3;
    contaPtr = new Conta("7709", "33230");

    conta1.setTipoDeConta("Conta_Corrente");
    cout << "Tipo de Conta: " << conta1.getTipoDeConta() << "\n";
    cout << "Situacao da Conta: ";
    conta1.exibirSituacaoCadastral();
    int identificadorDependentes[Conta::MAXQUANTIDADEDEPENDENTE] = {123, 456};

    int* ptrIDDependentes = identificadorDependentes;
    conta2.setIDDependentes(identificadorDependentes);

    cout << "id dependentes: \n";
    for (int i= 0; i < Conta::MAXQUANTIDADEDEPENDENTE; i++) {
        std::cout << conta2.getIDDependentes()[i] << ' ';
    }


    ptrIDDependentes = 0;
    delete ptrIDDependentes;
    contaPtr = 0; //desalocando memória
    delete contaPtr; //desalocando memória

    return 0;
}




