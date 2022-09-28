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
    Conta *contaPtr;
    Conta *contaPtr2;

    contaPtr = new Conta("7709", "33230124212");
    contaPtr2 = new Conta("1890", "67673190863");
    contaPtr->setSaldo(1000);
    cout << "abertura" << contaPtr->getDiasAbertura();
    contaPtr->imprimirDados();

    conta1.setTipoDeConta("Conta_Corrente");
    cout << "Tipo de Conta: " << conta1.getTipoDeConta() << "\n";
    cout << "Situacao da Conta: ";
    conta1.exibirSituacaoCadastral();
    int identificadorDependentes[Conta::getMAXQUANTIDADEDEPENDENTE()] = {123, 456};

    int* ptrIDDependentes = identificadorDependentes;
    contaPtr2->setIDDependentes(identificadorDependentes);

    cout << "id dependentes: ";
    for (int i= 0; i < Conta::getMAXQUANTIDADEDEPENDENTE(); i++) {
        std::cout << contaPtr2->getIDDependentes()[i] << ' ';
    }


    ptrIDDependentes = 0;
    delete ptrIDDependentes;
    contaPtr = 0; //desalocando memória
    delete contaPtr; //desalocando memória
    contaPtr2 = 0;
    delete contaPtr2;

    return 0;
}




