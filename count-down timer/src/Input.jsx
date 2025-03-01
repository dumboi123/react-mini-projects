function Input({ id ,label, value, max, min, disabled, onChange, onIncrease, onDecrease }){

  const handleInput = (e) => {
    if (e.target.value.length === 3 && e.target.value.startsWith("0")) {
      e.target.value = e.target.value.slice(1, 3);
    }
  };

    return (
      <div id = {id}>
      <i className="bi bi-chevron-double-up" onClick={onIncrease}></i>
      <span className="option-title">{label}</span>
      <input
        type="number"
        value={value}
        max={max}
        min={min}
        disabled={disabled}
        onChange={onChange}
        onInput={handleInput}
      />
      <i className="bi bi-chevron-double-down" onClick={onDecrease}></i>
    </div>
    )
}

export default Input;