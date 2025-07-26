import React, { useState } from 'react';
import { Header } from '../components/header';
import { Nav } from '../components/nav';
import RegistroCompra from '../components/registroCompra/RegistroCompra';
import GraficosAlimentacion from '../components/graficos/graficosAlimentacion';
import CalendarioAlimentacion from '../components/calendario/CalendarioAlimentacion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AlimentacionRecursos = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // Estilos reutilizables
    const styles = {
        appLayout: {
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            flexDirection: 'column'
        },
        contentWrapper: {
            display: 'flex',
            flex: 1,
            width: '100%',
            backgroundColor: '#f8f9fc'
        },
        mainContent: {
            flex: 1,
            padding: '1rem',
            overflow: 'auto',
            width: '100%',
            boxSizing: 'border-box'
        },
        container: {
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            padding: '0 1rem'
        },
        pageTitle: {
            fontSize: '1.75rem',
            marginBottom: '1.5rem',
            color: '#4e73df',
            fontWeight: '600'
        },
        mainGrid: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            '@media (min-width: 992px)': {
                flexDirection: 'row'
            }
        },
        leftColumn: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            '@media (min-width: 992px)': {
                width: '65%'
            }
        },
        rightColumn: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            '@media (min-width: 992px)': {
                width: '35%',
                minWidth: '350px'
            }
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s'
        },
        cardHeader: {
            padding: '1rem 1.5rem',
            backgroundColor: '#f8f9fc',
            borderBottom: '1px solid #e3e6f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        cardTitle: {
            margin: 0,
            fontWeight: '600',
            color: '#4e73df',
            fontSize: '1rem'
        },
        cardBody: {
            padding: '1.5rem'
        }
    };

    // Estilos para los recordatorios
    const reminderItemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.75rem',
        fontSize: '0.9rem',
        color: '#5a5c69'
    };

    const reminderIconStyle = {
        color: '#1cc88a',
        marginRight: '0.5rem',
        flexShrink: 0
    };

    const addReminderButton = {
        backgroundColor: '#4e73df',
        color: 'white',
        border: 'none',
        borderRadius: '0.35rem',
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.15s ease-in-out'
    };

    return (
        <div className="app-layout w-100" style={styles.appLayout}>
            <Header onToggleSidebar={toggleSidebar} />
            <div className="main-layout w-100">
                <Nav isOpen={sidebarOpen} onClose={closeSidebar} />
                <div className="main-content w-100">
                    <div style={styles.contentWrapper}>
                        <main style={styles.mainContent}>
                            <div style={styles.container}>
                                <h1 style={styles.pageTitle}>Alimentación y Recursos</h1>

                                <div style={styles.mainGrid}>
                                    {/* Columna izquierda */}
                                    <div style={styles.leftColumn}>
                                        {/* Tarjeta de Registro */}
                                        <div style={styles.card}>
                                            <div style={styles.cardHeader}>
                                                <h6 style={styles.cardTitle}>Registro de Alimentación</h6>
                                            </div>
                                            <div style={styles.cardBody}>
                                                <RegistroCompra />
                                            </div>
                                        </div>

                                        {/* Tarjeta de Estadísticas */}
                                        <div style={styles.card}>
                                            <div style={styles.cardHeader}>
                                                <h6 style={styles.cardTitle}>Estadísticas de Alimentación</h6>
                                            </div>
                                            <div style={styles.cardBody}>
                                                <GraficosAlimentacion />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Columna derecha */}
                                    <div style={styles.rightColumn}>
                                        <div style={styles.card}>
                                            <CalendarioAlimentacion />
                                        </div>

                                        {/* Sección de recordatorios */}
                                        <div style={styles.card}>
                                            <div style={styles.cardHeader}>
                                                <h6 style={styles.cardTitle}>Recordatorios</h6>
                                            </div>
                                            <div style={styles.cardBody}>
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <div style={reminderItemStyle}>
                                                        <i className="bi bi-check-circle-fill" style={reminderIconStyle}></i>
                                                        <span>Alimentación mañana a las 8:00 AM</span>
                                                    </div>
                                                    <div style={reminderItemStyle}>
                                                        <i className="bi bi-check-circle-fill" style={reminderIconStyle}></i>
                                                        <span>Revisión de inventario el 28/07</span>
                                                    </div>
                                                    <div style={{ ...reminderItemStyle, marginBottom: 0 }}>
                                                        <i className="bi bi-check-circle-fill" style={reminderIconStyle}></i>
                                                        <span>Pedido de alimento el 30/07</span>
                                                    </div>
                                                </div>
                                                <button
                                                    style={addReminderButton}
                                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2e59d9'}
                                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4e73df'}
                                                >
                                                    <i className="bi bi-plus-circle" style={{ marginRight: '0.5rem' }}></i>
                                                    Agregar Recordatorio
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

        </div>
    );
};

export { AlimentacionRecursos };