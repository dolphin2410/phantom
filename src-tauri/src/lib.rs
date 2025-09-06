use sha2::{Digest, Sha256};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn mint_password(service_name: &str, hash: &str, raw_password: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(format!("{}{}{}", service_name, hash, raw_password).as_bytes());
    format!("{:x}", hasher.finalize())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![mint_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
