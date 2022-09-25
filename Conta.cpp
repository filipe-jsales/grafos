#include "Conta.h"

#include <iostream>
using std::cout;
using std::string;


//instanciação de variáveis statics


const string Conta::TIPOSDECONTA[ QUANTIDADEMAXTIPODECONTA ] = {"Conta_Corrente", "Poupanca", "Conta_Salario"}; //array const com tipos de conta
const string Conta::TIPOSDESITUACAOCADASTRAL[ QUANTIDADEMAXREGULACAOCADASTRAL ] = {"Regular", "Negativada", "Fechada", "Em_Analise"}; //array const com tipos de conta


Conta::Conta(string  numero, string  cpfTitular)
:saldo(0.0), diasAbertuda(0)
{
    setNumero( numero );
    setCpfTitular( cpfTitular );
}

Conta::~Conta()
{
    
}

void Conta::setIDDependentes(int* idDependentes) 
{

    for (int i= 0; i < MAXQUANTIDADEDEPENDENTE; i++) {
        identificadorDependentes[i]= idDependentes[i];
    }
}

const int* Conta::getIDDependentes() const
{
    return identificadorDependentes;
}

void Conta::setTipoDeConta(const string & tipoDeConta) 
{
    this->tipoDeConta = tipoDeConta;
}

string Conta::getTipoDeConta() const 
{
    return this->tipoDeConta;
}


string Conta::getNumero() const
{
    return this->numero;
}

void Conta::setNumero(const string & numero)
{
    this->numero = numero;
}

void Conta::setCpfTitular(const string & cpfTitular)
{
    this->cpfTitular = cpfTitular;
}

string Conta::getCpfTitular() const
{
    return this->cpfTitular;
}

void Conta::setSaldo(float saldo)
{
    this->saldo = saldo;
}

float Conta::getSaldo() const 
{
    return this->saldo;
}

void Conta::setDiasAbertura(int diasAbertura)
{
    this->diasAbertuda = diasAbertuda;
}

int Conta::getDiasAbertura() const 
{
    return this->diasAbertuda;
}

void Conta::exibirTiposDeConta()
{
    //loop using for
    for (int i = 0; i < QUANTIDADEMAXTIPODECONTA; i++)
        cout << TIPOSDECONTA[ i ] << '\n'; // << ' ' << '(' <<&TIPOSDECONTA[ i ] << ')' << '\n';
}

void Conta::exibirTiposDeSituacaoCadastral()
{
    //loop using for
    int cont = 0;
    while (cont < QUANTIDADEMAXREGULACAOCADASTRAL)
    {
        cout << TIPOSDESITUACAOCADASTRAL[ cont ] << '\n'; // << ' ' << '(' <<&TIPOSDECONTA[ i ] << ')' << '\n';
        cont ++;
    };
}

void Conta::imprimirDados() const
{
    cout << "Saldo: " << this->saldo << "\n";
    cout << "CPF do titular: " << this->cpfTitular << "\n";
    cout << "Numero da conta: " << this->numero <<  "\n";
    cout << "Conta aberta a: " << this->diasAbertuda << "dias" << "\n";
    exibirSituacaoCadastral();
}

void Conta::exibirSituacaoCadastral() const
{
    if (this->diasAbertuda == 0)
        cout << "Em_Abertura" << "\n";
        return;
    if (this->diasAbertuda > 30 && this->saldo >= 0)
        cout << "Regular" << "\n";
        return;
    if (this->diasAbertuda > 30 && this->saldo < 0)
        cout << "Negativada" << "\n";
        return;
    cout << "Fechada" << "\n";
    return;
;}